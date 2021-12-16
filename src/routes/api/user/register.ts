import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { setSessionHeaders } from "$lib/stores/UserStore";
import { supabase, users } from "$lib/utils/db";
// import type { supabase as types } from "C:\Dev\git\sveltekit-supabase\types\supabase"

export async function post(request: { body: string }) {

    let model: RegisterUserModel = JSON.parse(request.body);

    try {
        const { session, error } = await supabase.auth.signUp({
            email: model.email,
            password: model.password
        });

        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message),
            };
        }

        await supabase
            .from('profiles')
            .insert([
                {
                    id: session.user.id,
                    username: model.username,
                    updated_at: session.user.created_at
                }
            ])

        let userProfileModel  = await users.profileById(session.user.id);

        return {
            status: 200,
            body: getSuccessResponse({ session, userProfileModel }),
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
