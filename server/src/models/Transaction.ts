import mongoose, { Schema, Document, Types } from 'mongoose';

/**
 * Transaction status enum
 */
export type TransactionStatus = 'pending' | 'confirmed' | 'failed';

/**
 * Transaction type enum
 */
export type TransactionType = 'view_purchase' | 'download_purchase';

/**
 * Transaction interface
 * Tracks on-chain payments for future x402 integration
 */
export interface ITransaction extends Document {
  walletAddress: string;
  projectId: Types.ObjectId;
  amount: number;
  currency: string;
  txHash?: string;
  status: TransactionStatus;
  type: TransactionType;
  // For Move/x402 integration
  chainId?: string;
  blockNumber?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    walletAddress: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    txHash: {
      type: String,
      sparse: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed'],
      default: 'pending',
      index: true,
    },
    type: {
      type: String,
      enum: ['view_purchase', 'download_purchase'],
      required: true,
    },
    // For future blockchain integration
    chainId: {
      type: String,
    },
    blockNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
TransactionSchema.index({ walletAddress: 1, status: 1 });
TransactionSchema.index({ projectId: 1, status: 1 });
TransactionSchema.index({ createdAt: -1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
