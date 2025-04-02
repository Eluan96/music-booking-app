import jwt from 'jsonwebtoken';
import config from '../config/config';
import Artist from '../models/Artist';
import bcrypt from "bcrypt";
import dotenv  from "dotenv";

dotenv.config()



export const calculateDuration = (startTime: Date, endTime: Date): number => {
    const diff = endTime.getTime() - startTime.getTime();
    return diff / (1000 * 60 * 60); // Convert to hours
  };
  
  export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
    return startDate < endDate;
  };
  
  export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Generate JWT Token


  export const generateToken = (payload: { id: string; role: string }): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not defined in environment variables");
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

  export const hashedPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

//   export const isArtistBooking = async (userId: mongoose.Types.ObjectId, artistId: any): Promise<boolean> => {
//     const artist = await Artist.findOne({ userId });
//     return artist ? artist._id.toString() === artistId.toString() : false;
//   };

interface PaginationOptions {
    page: number,
    limit: number
}

export const getPagination = ({page, limit}: PaginationOptions) => {
    const offset = (page -1) * limit;
    return {offset, limit}
}