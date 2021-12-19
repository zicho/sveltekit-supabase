import { supabase } from "../db";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";
import { RepositoryBase } from "./RepositoryBase";
import type { UserProfileModel } from "$lib/models/user/UserProfileModel";

export abstract class UserRepository extends RepositoryBase {

    static async profile(username: string): Promise<UserProfileModel> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, description')
                .eq('username', username);

            if (!error) {
                return data[0]
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static async profileById(id: string): Promise<UserProfileModel> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, description')
                .eq('id', id);

            if (!error) {
                return data[0]
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}