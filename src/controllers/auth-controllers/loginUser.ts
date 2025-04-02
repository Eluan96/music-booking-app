import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../models/User';
import env from '../../config/config';
import { generateToken } from '../../utils/helpers';
import bcrypt from "bcrypt";



export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
        return;
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
        return;
      }
  
      // Generate token
      const userId = String(user._id); // Explicitly convert _id to string

      const token = generateToken({ id: userId, role: user.role });
  
      res.status(200).json({
        success: true,
        message: `Login successfully`,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };