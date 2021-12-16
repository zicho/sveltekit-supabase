import { getSuccessResponse } from "$lib/models/ServiceResponse";
import { users } from "$lib/utils/db";

export async function get() {

    console.dir('Hitting the endpoint')

    const data = await users.profile('datanist');


    console.dir("returning data");

    return {
        status: 200,
        body: getSuccessResponse(data),
    };
}