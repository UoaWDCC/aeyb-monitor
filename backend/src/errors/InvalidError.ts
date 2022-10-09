export default class InvalidError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}
