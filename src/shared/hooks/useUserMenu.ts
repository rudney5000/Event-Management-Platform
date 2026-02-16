import { useState } from "react";

export function useUserMenu() {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    const close = () => setOpen(open)
    const openMenu = () => setOpen(true);
    return {
        open,
        toggle,
        close,
        openMenu
    }
}