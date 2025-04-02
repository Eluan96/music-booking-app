import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist, { IArtist } from '../../models/Artist';
import User from '../../models/User';

export const updateArtist = async (req: Request, res: Response): Promise<void> => {
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
          message: 'Not authorized to update this profile',
        });
        return;
      }
      
      const updatedArtist = await Artist.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      
      res.status(200).json({
        success: true,
        data: updatedArtist,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };