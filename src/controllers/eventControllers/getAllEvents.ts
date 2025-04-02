import { Request, Response } from 'express';
import Event, { IEvent } from '../../models/Events';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
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
        const totalBookings = await Event.countDocuments();
    
        // Fetch paginated artists
        const event = await Event.find().skip(offset).limit(limit);
    
        res.status(200).json({
            success: true,
            totalBookings,
            totalPages: Math.ceil(totalBookings / limit),
            currentPage: page,
            data: event,
        });
    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: (error as Error).message,
        });
    }
  };