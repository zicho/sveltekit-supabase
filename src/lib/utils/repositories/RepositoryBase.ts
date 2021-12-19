import { supabase } from "../db";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";

export enum Table {
    Profiles = 'profiles',
    Messages = 'private_messages',
}

export abstract class RepositoryBase {
    static async getSingle<T>(id: string, table: Table):Promise<T>  {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")
                .match({ "id": id });

            if (!error) {
                return data[0]
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    static async getAll<T>(table: Table): Promise<T[]> {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")

            if (!error) {
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    static async add<T>(table: Table, model: T): Promise<void> {
        try {
            const { error } = await supabase
                .from(table)
                .insert(model)

            if (!error) {
                return;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    };
}