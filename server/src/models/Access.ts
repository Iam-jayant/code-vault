import mongoose, { Schema, Document, Types } from 'mongoose';

/**
 * Access type enum
 */
export type AccessType = 'view' | 'download';

/**
 * Access interface
 * Tracks which wallet has access to which project
 * Critical for syncing with Move on-chain access
 */
export interface IAccess extends Document {
  projectId: Types.ObjectId;
  walletAddress: string;
  accessType: AccessType;
  grantedAt: Date;
  // For future x402/Move integration
  txHash?: string;
  onChainVerified: boolean;
}

const AccessSchema = new Schema<IAccess>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    walletAddress: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    accessType: {
      type: String,
      enum: ['view', 'download'],
      required: true,
    },
    grantedAt: {
      type: Date,
      default: Date.now,
    },
    // For future blockchain verification
    txHash: {
      type: String,
      sparse: true,
    },
    onChainVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index - one access record per wallet per project per type
AccessSchema.index(
  { projectId: 1, walletAddress: 1, accessType: 1 },
  { unique: true }
);

// Index for checking user's access across projects
AccessSchema.index({ walletAddress: 1, accessType: 1 });

export const Access = mongoose.model<IAccess>('Access', AccessSchema);
