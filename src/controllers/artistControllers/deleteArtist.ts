import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist, { IArtist } from '../../models/Artist';
import User from '../../models/User';

export const deleteArtist = async (req: Request, res: Response): Promise<void> => {
    try {
      const artist = await Artist.findById(req.params.id);
      
      if (!artist) {
        res.status(404).json({
          success: false,
          message: 'Artist not found',
        });
        return;
      }
      
      // Check if user is the owner of the profile or an admin
      if (req.user?.role !== 'user') {
        res.status(403).json({
          success: false,
          message: 'Not authorized to delete this profile',
        });
        return;
      }
      
      await Artist.findByIdAndDelete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Artist profile deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };