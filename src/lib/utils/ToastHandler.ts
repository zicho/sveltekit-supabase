import { toasts } from "svelte-toasts";

export const toast = (message: string, title?: string) => {
    toasts.add({
        title: title,
        description: message,
        duration: 4000, // 0 or negative to avoid auto-remove
        placement: 'bottom-right',
        type: 'success',
        theme: 'light'
    });
};
