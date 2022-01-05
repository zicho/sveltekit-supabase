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
    var data = await MessageRepository.getUnreadCount(username);
    unreadMessages.set(data);
    return data;
}

export async function updateMessages(username: string) {
    await getUnreadCount(username);
    inbox.set(await MessageRepository.getMessagesForUser(username))
}


export async function handleIncomingMessage(payload) {
    toast(payload.new.content, `${ToastTitles.PrivateMessageFrom} ${payload.new.from}`);
    await updateMessages(payload.new.to);
}

export async function markAllAsRead(username: string): Promise<ServiceResponse<void | unknown>> {
    try {
        await MessageRepository.markAllAsRead(username).then(async () =>

            await getUnreadCount(username)
        ).catch(err => {
            console.log(err)
            return getFailedResponse(ErrorMessages.GenericError);
        });
        
        return getSuccessResponse();
    } catch(error) {
        console.log(error);
        return getFailedResponse(ErrorMessages.GenericError);
    }
}