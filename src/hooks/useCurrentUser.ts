import { useAppSelector } from '../shared/hooks';

export function useCurrentUser() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return { user, isAuth: isAuthenticated };
}
