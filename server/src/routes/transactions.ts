import { Router, Request, Response } from 'express';
import { Transaction, Access } from '../models';
import mongoose from 'mongoose';

const router = Router();

/**
 * POST /api/transactions
 * Create a new transaction record (for future x402 integration)
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      walletAddress,
      projectId,
      amount,
      currency,
      type,
      txHash,
      chainId,
    } = req.body;

    if (!walletAddress || !projectId || amount === undefined || !type) {
      return res.status(400).json({
        success: false,
        error: 'walletAddress, projectId, amount, and type are required',
      });
    }

    if (!['view_purchase', 'download_purchase'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'type must be "view_purchase" or "download_purchase"',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid project ID',
      });
    }

    const transaction = await Transaction.create({
      walletAddress: walletAddress.toLowerCase(),
      projectId: new mongoose.Types.ObjectId(projectId),
      amount,
      currency: currency || 'USD',
      type,
      txHash,
      chainId,
      status: txHash ? 'pending' : 'pending',
    });

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('[Transactions] Create error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create transaction',
    });
  }
});

/**
 * PUT /api/transactions/:id/confirm
 * Confirm a transaction and grant access
 */
router.put('/:id/confirm', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { txHash, blockNumber } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid transaction ID',
      });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    }

    // Update transaction status
    transaction.status = 'confirmed';
    if (txHash) transaction.txHash = txHash;
    if (blockNumber) transaction.blockNumber = blockNumber;
    await transaction.save();

    // Grant access based on transaction type
    const accessType = transaction.type === 'download_purchase' ? 'download' : 'view';
    
    await Access.findOneAndUpdate(
      {
        projectId: transaction.projectId,
        walletAddress: transaction.walletAddress,
        accessType,
      },
      {
        $set: {
          grantedAt: new Date(),
          txHash: transaction.txHash,
          onChainVerified: true,
        },
      },
      { upsert: true }
    );

    return res.json({
      success: true,
      data: transaction,
      message: 'Transaction confirmed and access granted',
    });
  } catch (error) {
    console.error('[Transactions] Confirm error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to confirm transaction',
    });
  }
});

/**
 * GET /api/transactions/user/:walletAddress
 * Get all transactions for a wallet
 */
router.get('/user/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const normalizedWallet = walletAddress.toLowerCase();

    const transactions = await Transaction.find({ walletAddress: normalizedWallet })
      .populate('projectId', 'title')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error('[Transactions] Get user transactions error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get transactions',
    });
  }
});

/**
 * GET /api/transactions/project/:projectId
 * Get all transactions for a project (owner only)
 */
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid project ID',
      });
    }

    const transactions = await Transaction.find({ 
      projectId: new mongoose.Types.ObjectId(projectId) 
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error('[Transactions] Get project transactions error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get transactions',
    });
  }
});

export default router;
