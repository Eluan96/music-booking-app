import { Request, Response } from 'express';
import Event, { IEvent } from '../../models/Events';

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await Event.findById(req.params.id);
      
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
          message: 'Not authorized to update this event',
        });
        return;
      }
      
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      
      res.status(200).json({
        success: true,
        data: updatedEvent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };