import LocationDTO from '../dtos/LocationDTO';

export type AddLocationRequest = Omit<LocationDTO, 'id'>;

export type UpdateLocationRequest = Partial<Omit<LocationDTO, 'id'>>;
