import { getSuccessResponse } from "$lib/models/ServiceResponse";
import { users } from "$lib/utils/db";

export async function get({params}) {

    console.dir('Hitting the endpoint')
    console.dir(params.username)


    const data = await users.profile(params.username);

    console.dir(data)


    console.dir("returning data");

    return {
        status: 200,
        body: getSuccessResponse(data),
    };
}