import { writable } from "svelte/store";

export let modalIsOpen = writable<boolean>(false);
let modalConfirmAction: Function;
export let modalMessage = writable<string>();

export function showModal(msg: string, confirmAction?: Function) {
    modalIsOpen.set(true);
    modalConfirmAction = confirmAction;
    modalMessage.set(msg);
}

export function onModalConfirmClicked() {
    modalConfirmAction();
    modalIsOpen.set(false);
}