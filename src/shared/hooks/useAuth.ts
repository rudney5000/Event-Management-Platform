import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export function useAuth() {
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuth = !!token;
    return { token, isAuth };
}