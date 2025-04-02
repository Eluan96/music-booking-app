import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../models/User';
import env from '../../config/config';
import { generateToken, hashedPassword } from '../../utils/helpers';
import { v4 } from "uuid";



export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role, phone } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'User already exists',
        });
        return;
      }

      const hashPassword: string = await hashedPassword(password);

  
      // Create new user
      const user = await User.create({
        name,
        email,
        password: hashPassword,
        role: role || 'user',
        phone,
      });
  
      // Generate token
      const userId = String(user._id); // Explicitly convert _id to string

      const token = generateToken({ id: userId, role: user.role });
  
      res.status(201).json({
        success: true,
        message: "Account is created successfully",
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