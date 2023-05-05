import { Router } from 'express';

import {
    getAllLocations,
    getLocation,
    deleteLocation,
    addLocation,
    updateLocation,
} from '../controllers/LocationController';

const LocationRouter = Router();

LocationRouter.route('/').get(getAllLocations).post(addLocation);
LocationRouter.route('/:meetingId').get(getLocation).delete(deleteLocation).patch(updateLocation);

export default LocationRouter;
