/**
 * The request was successful and contains some reponse payload in the data field.
 */
export interface SuccessfulResponse<T> {
    status: 'success';
    data: T;
}
