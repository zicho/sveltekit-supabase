import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { LoginUserModel } from "$lib/models/user/LoginUserModel";
import { setSessionHeaders } from "$lib/stores/UserStore";
import { supabase, users } from "$lib/utils/db";

export async function post(request: { body: string }) {

    let model: LoginUserModel = JSON.parse(request.body);

    try {
        const { session, error } = await supabase.auth.signIn({ email: model.email, password: model.password });
        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        let userProfileModel= await users.profileById(session.user.id);

        return {
            status: 200,
            body: getSuccessResponse({session, userProfileModel}),
            headers: setSessionHeaders(session)
        };

    } catch (error: unknown) {

        console.log(error)

        return {
            status: 500,
            body: getFailedResponse(),
        };
    }
}
