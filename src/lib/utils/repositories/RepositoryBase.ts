import { supabase } from "../db";
import type { Tables } from "../DatabaseTypes";


export abstract class RepositoryBase {
    static async getSingle<T>(id: string, table: Tables): Promise<T> {
        try {
            const { data, error } = await supabase
                .from<T>(table)
                .select("*")
                .match({ "id": id });

            if (!error) {
                return data[0]
            } else {
                console.log(error)
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    static async getAll<T>(table: Tables): Promise<T[]> {
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

    static async add<T>(table: Tables, model: T): Promise<void> {
        try {
            const { error } = await supabase
                .from(table)
                .insert(model)

            if (!error) {
                return;
            } else {
                console.log(error.message)
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    static async deleteRange(table: Tables, ids: number[]): Promise<void> {
        ids.forEach(async id => {
            const { data, error } = await supabase
                .from(table)
                .delete()
                .match({ id: id })
        });
    }
}