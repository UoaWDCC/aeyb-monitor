import { Router } from 'express';
import { addEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../controllers/EventController';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

const EventRouter = Router();

EventRouter.route('/').get(getAllEvents).post(addEvent);
EventRouter.route('/:eventId').get(getEvent).delete(deleteEvent).patch(updateEvent);

export default EventRouter;
