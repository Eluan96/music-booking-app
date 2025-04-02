import { Request, Response } from 'express';
import Bookings from '../../models/Bookings';

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await Bookings.findById(req.params.id);
      
      if (!event) {
        res.status(404).json({
          success: false,
          message: 'Event not found',
        });
        return;
      }
      
      // Check if user is the organizer or an admin
      if ( req.user?.role !== 'user') {
        res.status(403).json({
          success: false,
          message: 'Not authorized to delete this event',
        });
        return;
      }
      
      await Bookings.findByIdAndDelete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Event deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };