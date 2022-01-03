import { toasts, ToastContainer, FlatToast, BootstrapToast } from "svelte-toasts";
import { addToast } from "as-toast";

export const toast = (message: string, title?: string) => {
    toasts.add({
        title: title,
        description: message,
        duration: 4000, // 0 or negative to avoid auto-remove
        placement: 'bottom-right',
        type: 'info',
        theme: 'light'
    });
};
