import { supabase } from "../db";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";
import { RepositoryBase } from "./RepositoryBase";
import type { UserProfileModel } from "$lib/models/user/UserProfileModel";
import { Tables } from "../DatabaseTypes";
import type { definitions } from "../../../../types/supabase"
export abstract class UserRepository extends RepositoryBase {

    static async profile(username: string): Promise<ServiceResponse<UserProfileModel>> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, description')
                .eq('username', username);

            console.dir(data)


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

            console.dir(data)

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

    static async updateDescription(username: string, newDesc: string): Promise<ServiceResponse<void>> {
        try {
            // const { error } = await supabase
            //     .from<definitions[Tables.Profiles]>(Tables.Profiles)
            //     .update({ description: 'poo'})
            //     .match({ username: username })

            const { data, error } = await supabase
            .from('profiles')
            .update({ username: 'Poo' })
            .eq('username', 'test')

            if (!error) {
                return getSuccessResponse();
            } else {
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    }
}