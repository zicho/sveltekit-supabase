import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import { clearSessionHeaders } from "$lib/services/UserService";
import { supabase } from "$lib/utils/db";

export async function post() {

    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        return {
            status: 200,
            body: getSuccessResponse(),
            headers: clearSessionHeaders()
        };

    } catch (error: unknown) {

        console.log(error)

        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
