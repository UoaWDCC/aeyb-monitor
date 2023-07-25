// import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import Location from '../models/LocationModel';
import Meeting from '../models/MeetingModel';
import { LocationIdParam } from '@shared/params';
import { TypedRequest, TypedRequestParams, TypedResponse } from '../types/UtilTypes';
import LocationDTO from '@shared/dtos/LocationDTO';
import {
    GetAllLocationData,
    GetLocationData,
    AddLocationData,
    UpdateLocationData,
    DeleteLocationData,
} from '@shared/responses/LocationResponses';

/**
 * @desc 	Get all the location
 * @route 	GET /api/locations
 */
const getAllLocations = asyncHandler(async (req: TypedRequest, res: TypedResponse<GetAllLocationData>) => {
    const locations = await Location.find();

    res.ok({
        results: locations.length,
        locations,
    });
});
/**
 * @desc 	Get a specific Location
 * @route 	GET /api/Locations/:locationId
 */
const getLocation = asyncHandler(
    async (req: TypedRequestParams<LocationIdParam>, res: TypedResponse<GetLocationData>) => {
        const location = await Location.findById(req.params.locationId);
        if (!location) {
            return res.notFound(`There is no location with the id ${req.params.locationId}`);
        }

        res.ok({
            location,
        });
    },
);

/**
 * @desc 	Add a new Location
 * @route 	POST /api/Locations
 */
const addLocation = asyncHandler(async (req: TypedRequest<LocationDTO>, res: TypedResponse<AddLocationData>) => {
    const newLocation = await Location.create(req.body);

    res.created({ location: newLocation });
});

/**
 * @desc 	Edit a specific Location
 * @route 	PATCH /api/Locations/:locationId
 */
const updateLocation = asyncHandler(
    async (req: TypedRequest<LocationDTO, LocationIdParam>, res: TypedResponse<UpdateLocationData>) => {
        const location = await Location.findOneAndUpdate({ _id: req.params.locationId }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!location) {
            return res.notFound(`There is no valid Location with the id ${req.params.locationId}`);
        }

        res.ok({ location });
    },
);

/**
 * @desc 	Delete a specific Location
 * @route 	DELETE /api/Locations/:locationId
 */
const deleteLocation = asyncHandler(
    async (req: TypedRequestParams<LocationIdParam>, res: TypedResponse<DeleteLocationData>) => {
        const meeting = await Meeting.find({ location: req.params.locationId });
        if (meeting) {
            return res.error(500, 'There is a meeting with this location');
        }
        // Delete the Location
        const response = await Location.findByIdAndDelete(req.params.locationId);
        if (!response) {
            return res.notFound(`There is no location with the id ${req.params.locationId}`);
        }

        res.sendStatus(501);
    },
);

export { getAllLocations, getLocation, deleteLocation, addLocation, updateLocation };
