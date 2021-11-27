
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

export function getFailedResponse(error?: string) {
    return new ServiceResponse(error == undefined ? 'There was an error processing this request' : error, false)
}

export function getSuccessResponse<T>(data: T) {
    return new ServiceResponse('Success!', true, data)
}