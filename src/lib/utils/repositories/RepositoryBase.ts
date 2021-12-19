import { supabase } from "../db";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";

export enum Table {
    Profiles = 'profiles',
    Messages = 'private_messages',
}

export abstract class RepositoryBase {
    static async getSingle<T>(id: string, table: Table):Promise<ServiceResponse<T|unknown>>  {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")
                .match({ "id": id });

            if (!error) {
                return getSuccessResponse(data[0])
            } else {
                return getFailedResponse(error.message)
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse("Something went wrong");
        }
    };

    static async getAll<T>(table: Table): Promise<ServiceResponse<T[]|unknown>> {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")

            if (!error) {
                return getSuccessResponse(data)
            } else {
                return getFailedResponse(error.message)
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse("Something went wrong");
        }
    };
}