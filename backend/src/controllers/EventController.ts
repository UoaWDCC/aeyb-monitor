import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Event from '../models/EventModel';
import { EventIdParam } from '../types/RequestParams';
import Role from '../models/RoleModel';

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

/**
 * @desc    Get a specific event
 * @route   GET /api/events/:eventId
 */
const getEvent = asyncHandler(async (req: Request<EventIdParam>, res: Response) => {
    const event = await Role.findById(req.params.eventId);

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});

export { getAllEvents, getEvent };
