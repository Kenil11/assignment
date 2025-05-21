export class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

export class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

export class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

export class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

export class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}