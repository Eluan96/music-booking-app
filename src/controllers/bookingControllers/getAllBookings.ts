import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking, { IBooking } from '../../models/Bookings';
import Artist from '../../models/Artist';
import Event from '../../models/Events';
import Bookings from '../../models/Bookings';


export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure user is authenticated and is an admin
    if (!req.user || req.user.role !== "user") {
        res.status(403).json({ success: false, message: "Access denied" });
        return;
    }

    // Pagination setup
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // Get total count of artists
    const totalBookings = await Bookings.countDocuments();

    // Fetch paginated artists
    const bookings = await Bookings.find().skip(offset).limit(limit);

    res.status(200).json({
        success: true,
        totalBookings,
        totalPages: Math.ceil(totalBookings / limit),
        currentPage: page,
        data: bookings,
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: "Server error",
        error: (error as Error).message,
    });
}
  };