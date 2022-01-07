import { browser } from "$app/env";
import { ErrorMessages, ToastTitles } from "$lib/models/core/Messages";
import type { PrivateMessageModel } from "$lib/models/messaging/PrivateMessageModel";
import { getFailedResponse, getSuccessResponse, ServiceResponse } from "$lib/models/ServiceResponse";
import { MessageRepository } from "$lib/utils/repositories/MessageRepository";
import { toast } from "$lib/utils/ToastHandler";
import { writable } from "svelte/store";

export const unreadMessages = writable<number>(0);
export let inbox = writable<PrivateMessageModel[]>();


async function getUnreadCount(username: string) {
    var res = await MessageRepository.getUnreadCount(username);

    if (res.success) {
        unreadMessages.set(res.data);
        return res.data;
    } else {
        return null;
    }
}

export async function updateMessages(username: string) {

    try {
        await getUnreadCount(username).then(async () => {

            var res = await MessageRepository.getMessagesForUser(username);
            if (res.success) {
                inbox.set(res.data);
            } else {

            }
        });
    } catch {

    }
}


export async function handleIncomingMessage(payload) {
    toast(payload.new.content, `${ToastTitles.PrivateMessageFrom} ${payload.new.from}`);
    await updateMessages(payload.new.to);
}

export async function markAsRead(username: string, ids: number[]): Promise<ServiceResponse<void | unknown>> {
    try {
        await MessageRepository.markAsRead(username, ids).then(async () =>
            await getUnreadCount(username)
        ).catch(err => {
            console.log(err)
            return getFailedResponse(ErrorMessages.GenericError);
        });

        return getSuccessResponse();
    } catch (error) {
        console.log(error);
        return getFailedResponse(ErrorMessages.GenericError);
    }
}