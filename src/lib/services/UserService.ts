import type { ServiceResponse } from "$lib/models/ServiceResponse";
import type { AuthUserModel } from "$lib/models/user/AuthUserModel";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { post } from "$lib/utils/EndpointClient";

export async function register(user: RegisterUserModel): Promise<ServiceResponse<AuthUserModel>> {

    try {
        return await post<RegisterUserModel, AuthUserModel>(user, 'api/user/register');

    } catch (err) {
        console.log(err);
    }
}