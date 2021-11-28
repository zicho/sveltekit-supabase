import type { ServiceResponse } from "$lib/models/ServiceResponse";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { post } from "$lib/utils/EndpointClient";

export async function register(user: RegisterUserModel): Promise<ServiceResponse<void>> {

    try {
        return await post<RegisterUserModel, void>(user, 'api/user/register');

    } catch (err) {
        console.log(err);
    }
}