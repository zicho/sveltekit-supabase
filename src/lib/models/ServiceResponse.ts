import { ErrorMessages } from "./core/Messages";

export class ServiceResponse<T> {

    constructor(message: string, success: boolean, data?: T) {
        this.message = message;
        this.success = success;
        this.data = data;
    }

    public message: string;
    public success: boolean;
    public data: T;
}

export function getFailedResponse<T>(error?: string, data?: T) {
    return new ServiceResponse(error == undefined ? ErrorMessages.GenericError : error, false, data)
}

export function getSuccessResponse<T>(data?: T) {
    return new ServiceResponse('Success!', true, data)
}