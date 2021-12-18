import { getSuccessResponse } from "$lib/models/ServiceResponse";
import { users } from "$lib/utils/db";

export async function get({params}) {
    const data = await users.profile(params.username);

    return {
        status: 200,
        body: getSuccessResponse(data),
    };
}