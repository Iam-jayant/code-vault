import mongoose, { Schema, Document } from 'mongoose';

/**
 * User interface
 * Represents users authenticated via Privy
 */
export interface IUser extends Document {
  privyId: string;
  walletAddress: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    privyId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    walletAddress: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      sparse: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient lookups
UserSchema.index({ walletAddress: 1, privyId: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
