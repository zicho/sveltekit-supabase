import { supabase } from "../db";
import type { Tables } from "../DatabaseTypes";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";


export abstract class RepositoryBase {
    static async getSingle<T>(id: string, table: Tables): Promise<ServiceResponse<T>> {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")
                .match({ "id": id });

            if (!error) {
                return getSuccessResponse(data[0]);

            } else {
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    };

    static async getAll<T>(table: Tables): Promise<ServiceResponse<T[]>> {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")

            if (!error) {
                return getSuccessResponse(data);
            } else {
                console.log(error);
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    };

    static async add<T>(table: Tables, model: T): Promise<ServiceResponse<void>> {
        try {
            const { error } = await supabase
                .from(table)
                .insert(model)

            if (!error) {
                return getSuccessResponse();
            } else {
                console.log(error.message)
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    };

    static async deleteRange(table: Tables, ids: number[]): Promise<ServiceResponse<void>> {
        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .in('id', ids)

            if (error) return getFailedResponse();

            return getSuccessResponse();
        } catch {
            return getFailedResponse();
        }

    }
}