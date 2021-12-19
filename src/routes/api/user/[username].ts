import { getSuccessResponse } from "$lib/models/ServiceResponse";
import { UserRepository } from "$lib/utils/repositories/UserRepository"

export async function get({params}) 
{
    console.log("here")
    const data = await UserRepository.profile(params.username);

    return {
        status: 200,
        body: getSuccessResponse(data),
    };
}