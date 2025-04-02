import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist, { IArtist } from '../../models/Artist';
import User from '../../models/User';

export const getArtistById = async (req: Request, res: Response): Promise<void> => {
    try {
      const artist = await Artist.findById(req.params.id)
      
      if (!artist) {
        res.status(404).json({
          success: false,
          message: 'Artist not found',
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