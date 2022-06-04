import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Event from '../models/EventModel';

/**
 * @desc    Get all the events
 * @route   GET /api/events
 */
const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
    const events = await Event.find();

    res.status(200).json({
        status: 'success',
        results: events.length,
        data: {
            events,
        },
    });
});

export { getAllEvents };
