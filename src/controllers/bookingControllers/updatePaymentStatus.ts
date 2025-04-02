import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking, { IBooking } from '../../models/Bookings';
import Artist from '../../models/Artist';
import Event from '../../models/Events';


export const updatePaymentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { paymentStatus, paymentDetails } = req.body;
      const booking = await Booking.findById(req.params.id);
      
      if (!booking) {
        res.status(404).json({
          success: false,
          message: 'Booking not found',
        });
        return;
      }
      
      // Only admin or the user who made the booking can update payment
      if (
        req.user?._id.toString() !== booking.userId.toString() && 
        req.user?.role !== 'admin'
      ) {
        res.status(403).json({
          success: false,
          message: 'Not authorized to update payment for this booking',
        });
        return;
      }
      
      booking.paymentStatus = paymentStatus as any;
      
      if (paymentDetails) {
        booking.paymentDetails.push(paymentDetails);
      }
      
      await booking.save();
      
      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };