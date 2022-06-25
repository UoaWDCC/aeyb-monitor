import { Router } from 'express';
import { addEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../controllers/EventController';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

const EventRouter = Router();

EventRouter.route('/')
    .get(protect(Permission.VIEW_EVENTS), getAllEvents)
    .post(protect(Permission.ADD_EVENTS), addEvent);
EventRouter.route('/:eventId')
    .get(protect(Permission.VIEW_EVENTS), getEvent)
    .delete(protect(Permission.DELETE_EVENTS), deleteEvent)
    .patch(protect(Permission.UPDATE_EVENTS), updateEvent);

export default EventRouter;
