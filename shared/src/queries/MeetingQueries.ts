import { MeetingType } from '../dtos/MeetingDTO';
import { PaginationQuery } from './utils';

export interface GetAllMeetingsQuery extends PaginationQuery {
    /** Only select meetings before this time in ms. */
    before?: string;

    /** Only select meetings after this time in ms. */
    after?: string;

    /**
     * Allow meetings that are in the past.
     *
     * @default false
     */
    passed?: 'true' | 'false';

    /** Only select meetings created by the user with this id */
    creator?: string;

    /** Only select meetings which have this string in their name (Case insensitive). */
    name?: string;

    /**
     * Only select meetings with this specific type.
     *
     * @default Both types of meetings are allowed
     */
    type?: MeetingType;
}
