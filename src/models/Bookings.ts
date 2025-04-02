import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  eventId: string;
  artistId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'canceled' | 'completed';
  bookingDate: Date;
  startTime: Date;
  endTime: Date;
  fee: number;
  notes?: string;
  contractSigned: boolean;
  paymentStatus: 'pending' | 'partial' | 'completed' | 'refunded';
  paymentDetails: {
    amount: number;
    currency: string;
    method: 'credit_card' | 'bank_transfer' | 'paypal' | 'other';
    transactionId?: string;
    paidAt?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: String,
      ref: 'Event',
      required: true,
    },
    artistId: {
      type: String,
      ref: 'Artist',
      required: true,
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'canceled', 'completed'],
      default: 'pending',
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    fee: {
      type: Number,
      required: [true, 'Fee is required'],
      min: [0, 'Fee cannot be negative'],
    },
    notes: {
      type: String,
    },
    contractSigned: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'completed', 'refunded'],
      default: 'pending',
    },
    paymentDetails: [
      {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          default: 'USD',
        },
        method: {
          type: String,
          enum: ['credit_card', 'bank_transfer', 'paypal', 'other'],
          required: true,
        },
        transactionId: {
          type: String,
        },
        paidAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IBooking>('Booking', BookingSchema);