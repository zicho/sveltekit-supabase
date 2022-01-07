import { writable } from "svelte/store";

export let modalIsOpen = writable<boolean>(false);
export let onModalConfirmAction = writable<Function>(() => {});
export let modalMessage = writable<string>();

export function showModal(msg: string, confirmAction: Function) {
    modalIsOpen.set(true);
    modalMessage.set(msg);
}