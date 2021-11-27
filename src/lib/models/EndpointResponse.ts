import type { ServiceResponse } from "./ServiceResponse";

export class EndpointResponse<T> {

    constructor(
        message: string,
        statusCode: number,
        success: boolean,
        headers?: any,
        serviceResponse?: ServiceResponse<T>
    ) {
        this.message = message
        this.statusCode = statusCode
        this.headers = headers
        this.success = success
        this.serviceResponse = serviceResponse
    }

    public message: string;
    public statusCode: number;
    public headers: any;
    public success: boolean;
    public serviceResponse: ServiceResponse<T>;
}