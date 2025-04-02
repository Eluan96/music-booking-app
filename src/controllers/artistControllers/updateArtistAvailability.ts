import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist, { IArtist } from '../../models/Artist';
import User from '../../models/User';

export const updateAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
      const { availability } = req.body;
      const artist = await Artist.findOne({ userId: req.user?._id });
      
      if (!artist) {
        res.status(404).json({
          success: false,
          message: 'Artist profile not found',
        });
        return;
      }
      
      artist.availability = availability;
      await artist.save();
      
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