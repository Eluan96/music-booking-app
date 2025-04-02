import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  organizerId: mongoose.Types.ObjectId;
  eventType: 'wedding' | 'corporate' | 'party' | 'concert' | 'other';
  startDate: Date;
  endDate: Date;
  duration: number; // in hours
  location: {
    venue: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  budget: {
    minimum: number;
    maximum: number;
    currency: string;
  };
  requirements: string[];
  attendees: number;
  isPublic: boolean;
  status: 'draft' | 'published' | 'canceled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    organizerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventType: {
      type: String,
      enum: ['wedding', 'corporate', 'party', 'concert', 'other'],
      required: [true, 'Event type is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [0.5, 'Duration must be at least 30 minutes'],
    },
    location: {
      venue: {
        type: String,
        required: [true, 'Venue name is required'],
      },
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      state: {
        type: String,
        required: [true, 'State is required'],
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
      },
      zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
      },
    },
    budget: {
      minimum: {
        type: Number,
        required: [true, 'Minimum budget is required'],
        min: [0, 'Minimum budget cannot be negative'],
      },
      maximum: {
        type: Number,
        required: [true, 'Maximum budget is required'],
        min: [0, 'Maximum budget cannot be negative'],
      },
      currency: {
        type: String,
        default: 'USD',
      },
    },
    requirements: {
      type: [String],
    },
    attendees: {
      type: Number,
      required: [true, 'Number of attendees is required'],
      min: [1, 'Number of attendees must be at least 1'],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'canceled', 'completed'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IEvent>('Event', EventSchema);