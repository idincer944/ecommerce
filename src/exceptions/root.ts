// message, status code, error codes, error

import { AnyTxtRecord } from "dns";

class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: any, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INVALID_CREDENTIALS = 1003,
}