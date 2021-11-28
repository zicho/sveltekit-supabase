import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { supabase } from "$lib/utils/db";
import cookie from 'cookie'

export async function post(request: { body: string }) {
    
    let model: RegisterUserModel = JSON.parse(request.body);
    
    try {
        const { session, error } = await supabase.auth.signUp({ email: model.email, password: model.password });
        if (error) {
            return {
                status: error.status,
                body: getFailedResponse(error.message), 
            };
        }

        console.dir(session);
        
        return {
            status: 200,
            body: getSuccessResponse(session),
            headers:  { 'Set-Cookie' : 
                cookie.serialize(
                    'access_token', session.access_token, {
                        httpOnly: true,
                        sameSite: 'lax',
                        secure: true,
                        maxAge: session.expires_in * 1000,
                        path: "/"
                    }
                )
            }
        };

    } catch (error: unknown) {

        console.log(error)

        return {
            status: 500,
            body: getFailedResponse(), 
        };
    }
}
