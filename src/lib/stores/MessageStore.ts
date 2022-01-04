import { browser } from "$app/env";
import { ToastTitles } from "$lib/models/core/Messages";
import { MessageRepository } from "$lib/utils/repositories/MessageRepository";
import { toast } from "$lib/utils/ToastHandler";
import { writable } from "svelte/store";

export const unreadMessages = writable<number>(0);

export async function getUnreadCount(username: string) {
    var data = await MessageRepository.getUnreadCount(username);
    unreadMessages.set(data);
    return data;
}

export async function handleIncomingMessage(payload) {
    toast(payload.new.content, `${ToastTitles.PrivateMessageFrom} ${payload.new.from}`);
    await getUnreadCount(payload.new.to);
}