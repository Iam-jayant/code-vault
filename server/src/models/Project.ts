import mongoose, { Schema, Document, Types } from 'mongoose';

/**
 * Project interface
 * Represents a codebase uploaded by a developer
 */
export interface IProject extends Document {
  title: string;
  description: string;
  ownerWalletAddress: string;
  priceView: number;
  priceDownload: number;
  isPublished: boolean;
  technologies: string[];
  images: string[];
  zipFileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    ownerWalletAddress: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
    },
    priceView: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    priceDownload: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    technologies: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    zipFileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
ProjectSchema.index({ isPublished: 1, createdAt: -1 });
ProjectSchema.index({ ownerWalletAddress: 1, createdAt: -1 });
ProjectSchema.index({ title: 'text', description: 'text' });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
