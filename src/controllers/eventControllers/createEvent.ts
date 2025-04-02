import { Request, Response } from 'express';
import Event, { IEvent } from '../../models/Events';

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        // Ensure user is authenticated
        if (!req.user) {
            res.status(401).json({ success: false, message: "Not authorized" });
            return;
        }

        // Destructure and validate required fields from request body
        const {
            title,
            description,
            eventType,
            startDate,
            endDate,
            duration,
            location,
            budget,
            requirements,
            attendees,
            isPublic,
            status,
        } = req.body;

        // Validate required fields
        if (!title || !description || !eventType || !startDate || !endDate || !duration || !location || !budget || !attendees) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }

        // Ensure the event duration is valid
        if (duration < 0.5) {
            res.status(400).json({ success: false, message: "Duration must be at least 30 minutes" });
            return;
        }

        // Ensure the budget has valid values
        if (budget.minimum < 0 || budget.maximum < 0 || budget.minimum > budget.maximum) {
            res.status(400).json({ success: false, message: "Invalid budget range" });
            return;
        }

        // Assign the logged-in user as the event organizer
        const newEvent = new Event({
            title,
            description,
            organizerId: req.user._id, // Automatically set organizerId
            eventType,
            startDate,
            endDate,
            duration,
            location,
            budget,
            requirements,
            attendees,
            isPublic: isPublic ?? true, // Default to public
            status: status ?? "draft", // Default status is "draft"
        });

        // Save the event
        const event = await newEvent.save();

        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: (error as Error).message,
        });
    }
};