import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import LocationDTO from '@shared/dtos/LocationDTO';
import { applyToJsonOptions } from './Utils';

export const LocationSchema = new Schema<LocationDTO>({
    location: String,
    type: {
        type: String,
        enum: ['online', 'inPerson'],
        default: 'online',
    },
});

applyToJsonOptions(LocationSchema);

const Location = mongoose.model('Location', LocationSchema);

export default Location;
