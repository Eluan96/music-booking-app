import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../models/User';
import env from '../../config/config';

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.findById(req.user?._id).select('-password');
  
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }
  
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };