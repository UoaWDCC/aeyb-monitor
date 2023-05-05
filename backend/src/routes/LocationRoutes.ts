import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';

import {
    getAllLocations,
    getLocation,
    deleteLocation,
    addLocation,
    updateLocation,
} from '../controllers/LocationController';

const LocationRouter = Router();

LocationRouter.route('/').get(getAllLocations).post(addLocation);
LocationRouter.route('/:meetingId')
    .get(protect('VIEW_LOCATIONS'), getLocation)
    .delete(protect('MANAGE_LOCATIONS'), deleteLocation)
    .patch(protect('MANAGE_LOCATIONS'), updateLocation);

export default LocationRouter;
