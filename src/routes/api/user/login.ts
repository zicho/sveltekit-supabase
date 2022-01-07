import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { LoginUserModel } from "$lib/models/user/LoginUserModel";
import { setSessionHeaders } from "$lib/stores/UserStore";
import { supabase, } from "$lib/utils/db";
import { UserRepository } from "$lib/utils/repositories/UserRepository"

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

        let res = await UserRepository.profileById(session.user.id);
        var profile = res.data;

        return {
            status: 200,
            body: getSuccessResponse({ session, profile }),
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
