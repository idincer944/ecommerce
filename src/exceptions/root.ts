// message, status code, error codes, error

export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 1004,
    INTERNAL_EXCEPTION = 1005,
    UNAUTHORIZED = 1006,
    PRODUCT_NOT_FOUND = 1007,
    ADDRESS_NOT_FOUND = 1008,
    ADDRESS_REQUIRED = 1009,
    ADDRESS_DOES_NOT_BELONG = 1010,
    ORDER_NOT_FOUND = 1011,
    ORDER_ALREADY_CANCELED = 1012
}