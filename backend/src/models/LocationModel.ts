import { Schema } from 'mongoose';
import LocationDTO from '@shared/dtos/LocationDTO';

export const LocationSchema = new Schema<LocationDTO>({
    location: String,
    type: {
        type: String,
        enum: ['online', 'inPerson'],
    },
});
