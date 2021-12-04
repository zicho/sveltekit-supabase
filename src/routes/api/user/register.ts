import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { setSessionHeaders } from "$lib/stores/UserStore";
import { supabase } from "$lib/utils/db";

export async function post(request: { body: string }) {

    let model: RegisterUserModel = JSON.parse(request.body);

    console.dir(model)

    try {
        const { session, error } = await supabase.auth.signUp({ email: model.email, password: model.password });

        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        return {
            status: 200,
            body: getSuccessResponse(session),
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
