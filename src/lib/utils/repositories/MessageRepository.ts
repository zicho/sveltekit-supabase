import { supabase } from "../db";
import { RepositoryBase, Table } from "./RepositoryBase";

export abstract class MessageRepository extends RepositoryBase {

    static async getUnreadCount(username: string): Promise<number> {
        try {
            const { error, count } = await supabase
                .from(Table.Messages)
                .select('*', { count: 'exact' })
                .eq('to', username)
                .eq('isRead', false);

            if (!error) {
                return count
            } else {
                return 0
            }
        } catch (error) {
            console.log(error)
            return 0;
        }
    }
}