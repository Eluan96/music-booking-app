import mongoose, { Document, Schema } from 'mongoose';

export interface IArtist extends Document {
  artistName: string;
  genres: string[];
  bio: string;
  hourlyRate: number;
  profileImage?: string;
  location: string;
  availability: string[];
  rating: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema = new Schema<IArtist>(
  {
    artistName: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    genres: {
      type: [String],
      required: [true, 'At least one genre is required'],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    hourlyRate: {
      type: Number,
      required: [true, 'Hourly rate is required'],
      min: [0, 'Hourly rate cannot be negative'],
    },
    profileImage: {
      type: String,
    },
    location: {
        type: String,
        required: [true, 'City is required'],
    },
    availability: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IArtist>('Artist', ArtistSchema);