import { Router } from 'express';
import { getAllEvents } from '../controllers/EventController';
import protect from '../middleware/AuthMiddleware';
import Permission from '../types/Perm';

const EventRouter = Router();

EventRouter.route('/').get(protect(Permission.VIEW_EVENTS), getAllEvents);
