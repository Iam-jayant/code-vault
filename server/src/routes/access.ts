import { Router, Request, Response } from 'express';
import { Access, Project } from '../models';
import mongoose from 'mongoose';

const router = Router();

/**
 * GET /api/access/check
 * Check if wallet has access to a project
 */
router.get('/check', async (req: Request, res: Response) => {
  try {
    const { projectId, walletAddress } = req.query;

    if (!projectId || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'projectId and walletAddress are required',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid project ID',
      });
    }

    const normalizedWallet = (walletAddress as string).toLowerCase();

    // Check if user is the owner (always has full access)
    const project = await Project.findById(projectId).lean();
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    if (project.ownerWalletAddress === normalizedWallet) {
      return res.json({
        success: true,
        data: {
          hasViewAccess: true,
          hasDownloadAccess: true,
          isOwner: true,
        },
      });
    }

    // Check access records
    const accessRecords = await Access.find({
      projectId: new mongoose.Types.ObjectId(projectId as string),
      walletAddress: normalizedWallet,
    }).lean();

    const hasViewAccess = accessRecords.some(a => a.accessType === 'view' || a.accessType === 'download');
    const hasDownloadAccess = accessRecords.some(a => a.accessType === 'download');

    return res.json({
      success: true,
      data: {
        hasViewAccess,
        hasDownloadAccess,
        isOwner: false,
      },
    });
  } catch (error) {
    console.error('[Access] Check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to check access',
    });
  }
});

/**
 * POST /api/access/grant
 * Grant access to a project (for future payment integration)
 */
router.post('/grant', async (req: Request, res: Response) => {
  try {
    const { projectId, walletAddress, accessType, txHash } = req.body;

    if (!projectId || !walletAddress || !accessType) {
      return res.status(400).json({
        success: false,
        error: 'projectId, walletAddress, and accessType are required',
      });
    }

    if (!['view', 'download'].includes(accessType)) {
      return res.status(400).json({
        success: false,
        error: 'accessType must be "view" or "download"',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid project ID',
      });
    }

    const normalizedWallet = walletAddress.toLowerCase();

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Create or update access record
    const access = await Access.findOneAndUpdate(
      {
        projectId: new mongoose.Types.ObjectId(projectId),
        walletAddress: normalizedWallet,
        accessType,
      },
      {
        $set: {
          grantedAt: new Date(),
          txHash: txHash || undefined,
          onChainVerified: !!txHash,
        },
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      data: access,
    });
  } catch (error) {
    console.error('[Access] Grant error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to grant access',
    });
  }
});

/**
 * GET /api/access/user/:walletAddress
 * Get all access records for a wallet
 */
router.get('/user/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const normalizedWallet = walletAddress.toLowerCase();

    const accessRecords = await Access.find({ walletAddress: normalizedWallet })
      .populate('projectId', 'title description ownerWalletAddress')
      .sort({ grantedAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: accessRecords,
    });
  } catch (error) {
    console.error('[Access] Get user access error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get access records',
    });
  }
});

export default router;
