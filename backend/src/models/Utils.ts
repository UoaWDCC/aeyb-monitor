import { Schema } from 'mongoose';

/**
 * Removes the __v, _id keys from the JSON of the schema and displays the id key instead.
 *
 * @param schema The schema to apply these toJSON options for
 *
 * @see https://mongoosejs.com/docs/guide.html#toJSON
 * @see https://stackoverflow.com/a/42763286/12643981
 */
export function applyToJsonOptions(schema: Schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret._id;
        },
    });
}
