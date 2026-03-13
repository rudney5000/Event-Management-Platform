import { useAppSelector } from '../shared/hooks';

export function useCurrentUser() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);

  return { user, isAuth };
}
