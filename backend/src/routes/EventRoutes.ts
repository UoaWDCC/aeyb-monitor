import { Router } from 'express';
import { getAllEvents, getEvent } from '../controllers/EventController';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

const EventRouter = Router();

EventRouter.route('/').get(protect(Permission.VIEW_EVENTS), getAllEvents);
EventRouter.route('/:eventId').get(protect(Permission.VIEW_EVENTS), getEvent);

export default EventRouter;
