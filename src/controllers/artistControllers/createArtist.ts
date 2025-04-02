import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Artist, { IArtist } from '../../models/Artist';
import User from '../../models/User';

export const createArtist = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            artistName,
            genres,
            bio,
            hourlyRate,
            profileImage,
            location,
            availability,
        } = req.body;

        // Check if user already has an artist profile
        const existingArtist = await Artist.findOne({where: {artistName: artistName}});
        if (existingArtist) {
            res.status(400).json({ success: false, message: "Artist profile created already" });
            return;
        }


        // Create artist profile
        const artist = await Artist.create({
            artistName,
            genres,
            bio,
            hourlyRate,
            profileImage,
            location,
            availability,
        });

        res.status(201).json({ success: true, data: artist });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: (error as Error).message });
    }
};