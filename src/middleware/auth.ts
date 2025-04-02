import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/config';
import User, { IUser } from '../models/User';

interface DecodedToken {
  id: string;
  role: string;
}

interface AuthRequest extends Request {
    user?: IUser;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, env.jwtSecret) as DecodedToken;

    // Get user from the token
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
      return;
    }

    next();
  };
};



export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorization = req.headers.authorization;

        // console.log('auth', authorization)
        

        if (!authorization) {
            res.status(401).json({ message: "Kindly sign in" });
            return; // Ensure function stops execution
        }

        // Extract token from "Bearer <token>"
        const token = authorization.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Verify token and extract `id`
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { id: string };

        if (!decoded.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // Fetch user from database
        const user = await User.findById(decoded.id).select("-password"); // Exclude password

        if (!user) {
            res.status(401).json({ message: "Invalid Credentials" });
            return;
        }

        // Attach full user object to request
        req.user = user as IUser;
        next(); // Call next middleware
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};