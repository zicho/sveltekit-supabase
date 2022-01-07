import { writable } from "svelte/store";

export let confirmModalIsOpen = writable<boolean>(false);
export let messageModalIsOpen = writable<boolean>(false);
export let modalMessage = writable<string>();

let modalConfirmAction: Function;

export function showMessageModal(msg: string) {
    messageModalIsOpen.set(true);
    modalMessage.set(msg);
}

export function showConfirmModal(msg: string, confirmAction: Function) {
    confirmModalIsOpen.set(true);
    modalConfirmAction = confirmAction;
    modalMessage.set(msg);
}

export function onModalConfirmClicked() {
    modalConfirmAction();
    confirmModalIsOpen.set(false);
}