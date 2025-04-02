import { Request, Response } from 'express';
import Event, { IEvent } from '../../models/Events';

export const getEventById = async (req: Request, res: Response): Promise<void> => {
    try {
        const artist = await Event.findById(req.params.id)
        
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