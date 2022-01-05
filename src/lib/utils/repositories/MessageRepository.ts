import { supabase } from "../db";
import { RepositoryBase } from "./RepositoryBase";
import type { definitions } from "../../../../types/supabase"
import { Tables } from "../DatabaseTypes";
import type { PrivateMessageModel } from "$lib/models/messaging/PrivateMessageModel";

export abstract class MessageRepository extends RepositoryBase {
    static async markAllAsRead(username: string) {
        try {
            const { error } = await supabase
                .from<definitions[Tables.Messages]>(Tables.Messages)
                .update({ isRead: true })
                .eq('to', username)
                .eq('isRead', false);

            if (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async getUnreadCount(username: string): Promise<number> {
        try {
            const { error, count } = await supabase
                .from<definitions[Tables.Messages]>(Tables.Messages)
                .select('*', { count: 'exact' })
                .eq('to', username)
                .eq('isRead', false);

            if (!error) {
                console.log("messages for " + username + ": " + count)
                return count
            } else {
                return 0
            }
        } catch (error) {
            console.log(error)
            return 0;
        }
    }

    static async getMessagesForUser(username: string): Promise<PrivateMessageModel[]> {
        try {
            const { error, data } = await supabase
                .from<definitions[Tables.Messages]>(Tables.Messages)
                .select('*')
                .eq('to', username);

            if (!error) {
                return data as PrivateMessageModel[]
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}