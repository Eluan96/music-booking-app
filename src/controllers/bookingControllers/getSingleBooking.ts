import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking, { IBooking } from '../../models/Bookings';
import Artist from '../../models/Artist';
import Event from '../../models/Events';
import Bookings from '../../models/Bookings';


export const getBookingById = async (req: Request, res: Response): Promise<void> => {
    try {
        const artist = await Bookings.findById(req.params.id)
        
        if (!artist) {
          res.status(404).json({
            success: false,
            message: 'Booking not found',
          });
          return;
        }
        
        res.status(200).json({
          success: true,
          data: artist,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: (error as Error).message,
        });
      }
  };