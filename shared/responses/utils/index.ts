import { SuccessfulResponse } from './SuccessfulResponse';
import { UnsuccessfulResponse } from './UnsuccessfulResponse';

type AEYBResponse<T> = SuccessfulResponse<T> | UnsuccessfulResponse;
export default AEYBResponse;

export type PaginatedResponse<T> = T & {
    hasNext: boolean;
    hasPrev: boolean;
    totalPages: number;
    page: number;
    limit: number;
    results: number;
    totalResults: number;
};
