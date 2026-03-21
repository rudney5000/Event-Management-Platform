import { useAppSelector } from '../shared/hooks';

export function useCurrentUser() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.user.profile);

  return { user, isAuth };
}
