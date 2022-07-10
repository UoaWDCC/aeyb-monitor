import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Event, { EventModel } from '../models/EventModel';
import { EventIdParam } from '../types/RequestParams';
import { QueryType, TypedRequest, TypedRequestBody, TypedRequestQuery } from '../types/UtilTypes';
import PaginationHandler from '../classes/PaginationHandler';
import { PaginationQuery } from '../types/QueryTypes';

interface FilterQuery extends PaginationQuery {
    name?: string;
}

function handleFilters(
    query: QueryType<EventModel>,
    req: TypedRequestQuery<FilterQuery>,
    res: Response,
): QueryType<EventModel> | undefined {
    if (req.query.name) {
        if (req.query.name === 'deny') {
            res.status(400).json({ status: 'error', message: 'You said to deny this request??? ' });
            return;
        }
        return query.where('name', new RegExp(`${req.query.name}`, 'i'));
    }
    return query;
}

/**
 * @desc    Get all the events
 * @route   GET /api/events
 */
const getAllEvents = asyncHandler(new PaginationHandler(Event).pre(handleFilters).handle);

/**
 * @desc    Get a specific event
 * @route   GET /api/events/:eventId
 */
const getEvent = asyncHandler(async (req: Request<EventIdParam>, res: Response) => {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
        res.status(404).json({
            status: 'error',
            message: `There is no event with the id ${req.params.eventId}`,
        });
        return;
    }

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});

/**
 * @desc    Add a new event
 * @route   POST /api/events/
 */
const addEvent = asyncHandler(async (req: TypedRequestBody<EventModel>, res: Response) => {
    req.body.creator = req.body.requester;
    const newEvent = await Event.create(req.body);

    await res.status(201).json({
        status: 'success',
        data: {
            event: newEvent,
        },
    });
});

/**
 * @desc    Delete a specific event
 * @route   DELETE /api/events/:eventId
 */
const deleteEvent = asyncHandler(async (req: Request<EventIdParam>, res: Response) => {
    const response = await Event.findByIdAndDelete(req.params.eventId);
    if (response) {
        res.status(204);
        return;
    }
    res.status(404).json({
        status: 'error',
        message: `There is no event with the id ${req.params.eventId}`,
    });
});

/**
 * @desc    Edit a specific event
 * @route   PATCH /api/events/:eventId
 */
const updateEvent = asyncHandler(async (req: TypedRequest<EventModel, EventIdParam>, res: Response) => {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!event) {
        res.status(404).json({
            status: 'error',
            message: `There is no event with the id ${req.params.eventId}`,
        });
        return;
    }

    res.status(200).json({
        status: 'success',
        data: {
            event,
        },
    });
});

export { getAllEvents, getEvent, addEvent, deleteEvent, updateEvent };
