import { Router, Request, Response } from 'express';
import { User } from '../models';

const router = Router();

/**
 * POST /api/users/sync
 * Sync user from Privy authentication
 * Creates user if not exists, returns existing user otherwise
 */
router.post('/sync', async (req: Request, res: Response) => {
  try {
    const { privyId, walletAddress, email } = req.body;

    // Validate required fields
    if (!privyId || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'privyId and walletAddress are required',
      });
    }

    // Normalize wallet address
    const normalizedWallet = walletAddress.toLowerCase();

    // Find or create user
    let user = await User.findOne({ privyId });

    if (user) {
      // Update wallet address and email if changed
      if (user.walletAddress !== normalizedWallet || user.email !== email) {
        user.walletAddress = normalizedWallet;
        if (email) user.email = email;
        await user.save();
      }
      
      return res.json({
        success: true,
        data: user,
        isNew: false,
      });
    }

    // Create new user
    user = await User.create({
      privyId,
      walletAddress: normalizedWallet,
      email: email || undefined,
    });

    return res.status(201).json({
      success: true,
      data: user,
      isNew: true,
    });
  } catch (error) {
    console.error('[Users] Sync error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to sync user',
    });
  }
});

/**
 * GET /api/users/:walletAddress
 * Get user by wallet address
 */
router.get('/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const normalizedWallet = walletAddress.toLowerCase();

    const user = await User.findOne({ walletAddress: normalizedWallet });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('[Users] Get user error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get user',
    });
  }
});

export default router;
