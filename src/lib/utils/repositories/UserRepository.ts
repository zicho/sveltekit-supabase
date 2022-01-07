import { supabase } from "../db";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";
import { RepositoryBase } from "./RepositoryBase";
import type { UserProfileModel } from "$lib/models/user/UserProfileModel";

export abstract class UserRepository extends RepositoryBase {

    static async profile(username: string): Promise<ServiceResponse<UserProfileModel>> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, description')
                .eq('username', username);

            if (!error) {
                return getSuccessResponse(data[0]);
            } else {
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    }

    static async profileById(id: string): Promise<ServiceResponse<UserProfileModel>> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, description')
                .eq('id', id);

            if (!error) {
                return getSuccessResponse(data[0]);
            } else {
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    }
}