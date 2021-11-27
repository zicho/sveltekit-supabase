import { getFailedResponse, getSuccessResponse } from "$lib/models/ServiceResponse";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { supabase } from "$lib/utils/db";

export async function post(request: { body: string }) {
    
    let model: RegisterUserModel = JSON.parse(request.body);
    
    try {
        throw new Error();
        const { user, error } = await supabase.auth.signUp({ email: model.email, password: model.password });
        if (error) {
            return {
                status: 400,
                body: getFailedResponse(error.message), 
            };
        }
        
        return {
            status: 200,
            body: getSuccessResponse(user)
        };

    } catch (error: unknown) {
        console.log("I crashed")
        return {
            status: 500,
            body: getFailedResponse(), 
        };
    }
}
