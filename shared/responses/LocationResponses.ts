import LocationDTO from '../dtos/LocationDTO';
import { PaginatedResponse } from './utils';

export interface GetAllLocationData {
    /* The number of locations stored */
    results: number;
    locations: LocationDTO[];
}

export interface GetLocationData {
    location: LocationDTO;
}

export interface AddLocationData {
    /** The newly added location. */
    location: LocationDTO;
}

export interface DeleteLocationData {
    /** The number of users who had the role removed from them. */
    modifiedLocationCount: number;
}

export interface UpdateLocationData {
    /** The updated location. */
    location: LocationDTO;
}
