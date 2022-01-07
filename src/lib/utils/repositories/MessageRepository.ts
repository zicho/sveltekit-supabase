import { supabase } from "../db";
import { RepositoryBase } from "./RepositoryBase";
import type { definitions } from "../../../../types/supabase"
import { Tables } from "../DatabaseTypes";
import type { PrivateMessageModel } from "$lib/models/messaging/PrivateMessageModel";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";

export abstract class MessageRepository extends RepositoryBase {
    static async markAsRead(username: string, ids: number[]): Promise<ServiceResponse<void>> {
        try {
            const { error } = await supabase
                .from<definitions[Tables.Messages]>(Tables.Messages)
                .update({ isRead: true })
                .eq('to', username)
                .in('id', ids)

            if (error) {
                console.log(error)
                return getFailedResponse();
            }

            return getSuccessResponse();
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    }

    static async getUnreadCount(username: string): Promise<ServiceResponse<number>> {
        try {
            const { error, count } = await supabase
                .from<definitions[Tables.Messages]>(Tables.Messages)
                .select('*', { count: 'exact' })
                .eq('to', username)
                .eq('isRead', false);

            if (!error) {
                console.log("messages for " + username + ": " + count)
                return getSuccessResponse(count);
            } else {
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    }

    static async getMessagesForUser(username: string): Promise<ServiceResponse<PrivateMessageModel[]>> {
        try {
            const { error, data } = await supabase
                .from<definitions[Tables.Messages]>(Tables.Messages)
                .select('*')
                .eq('to', username);

            if (!error) {
                return getSuccessResponse(data as PrivateMessageModel[]);
            } else {
                return getFailedResponse();
            }
        } catch (error) {
            console.log(error)
            return getFailedResponse();
        }
    }
}