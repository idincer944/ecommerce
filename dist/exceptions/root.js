"use strict";
// message, status code, error codes, error
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 1004] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 1005] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 1006] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["PRODUCT_NOT_FOUND"] = 1007] = "PRODUCT_NOT_FOUND";
    ErrorCode[ErrorCode["ADDRESS_NOT_FOUND"] = 1008] = "ADDRESS_NOT_FOUND";
    ErrorCode[ErrorCode["ADDRESS_REQUIRED"] = 1009] = "ADDRESS_REQUIRED";
    ErrorCode[ErrorCode["ADDRESS_DOES_NOT_BELONG"] = 1010] = "ADDRESS_DOES_NOT_BELONG";
    ErrorCode[ErrorCode["ORDER_NOT_FOUND"] = 1011] = "ORDER_NOT_FOUND";
    ErrorCode[ErrorCode["ORDER_ALREADY_CANCELED"] = 1012] = "ORDER_ALREADY_CANCELED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
