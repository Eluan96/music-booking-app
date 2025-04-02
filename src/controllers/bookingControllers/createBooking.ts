import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking, { IBooking } from '../../models/Bookings';
import Artist from '../../models/Artist';
import Event from '../../models/Events';
import { IUser } from '../../models/User';
import Events from '../../models/Events';


interface AuthRequest extends Request {
    user?: IUser;
}

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            res.status(401).json({ success: false, message: "Not authorized" });
            return;
        }

        // Extract eventId & artistId (from req.params or req.query)
        const eventId = req.params.eventId || req.query.eventId;
        const artistId = req.params.artistId || req.query.artistId;

        if (!eventId || !artistId) {
            res.status(400).json({ success: false, message: "Event ID and Artist ID are required" });
            return;
        }

        const { bookingDate, startTime, endTime, fee, notes } = req.body;

        // Verify event exists & user is the organizer/admin
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({ success: false, message: "Event not found" });
            return;
        }

        // Only regular users can book an artist for an event
        if (req.user.role !== "user") {
            res.status(403).json({ success: false, message: "Only users can book artists" });
            return;
        }

        // Verify artist exists
        const artist = await Artist.findById(artistId);
        if (!artist) {
            res.status(404).json({ success: false, message: "Artist not found" });
            return;
        }

        // Check artist availability on the given date
        const isAvailable = artist.availability;
        if (!isAvailable) {
            res.status(400).json({ success: false, message: "Artist is not available on this date" });
            return;
        }

        // Create booking
        const booking = await Booking.create({
            userId: req.user._id,
            eventId,
            artistId,
            bookingDate,
            startTime,
            endTime,
            fee,
            notes,
            status: "pending",
            paymentStatus: "pending",
        });


        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: (error as Error).message,
        });
    }
};