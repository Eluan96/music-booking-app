import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist, { IArtist } from '../../models/Artist';
import User from '../../models/User';
import { getPagination } from '../../utils/helpers';



export const getAllArtists = async (req: Request, res: Response): Promise<void> => {
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
        const totalArtists = await Artist.countDocuments();

        // Fetch paginated artists
        const artists = await Artist.find().skip(offset).limit(limit);

        res.status(200).json({
            success: true,
            totalArtists,
            totalPages: Math.ceil(totalArtists / limit),
            currentPage: page,
            data: artists,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: (error as Error).message,
        });
    }
};