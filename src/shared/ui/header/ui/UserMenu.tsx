import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { NavLink, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { UserCircleIcon } from 'lucide-react';
import { getUserMenuItems } from '../model/constants';

interface User {
  email: string;
}

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const { t } = useTranslation();
  const userMenuItems = getUserMenuItems(t);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" className="text-sm/6 w-full font-semibold text-white hover:text-gray-300 transition-colors px-3 py-2">
          {t('header.logIn')}
        </Link>
        <Link to="/signup" className="text-sm/6 w-full font-semibold bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          {t('header.signUp')}
        </Link>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 text-sm/6 font-semibold text-white hover:text-gray-300 transition-colors">
        <span className="hidden xl:block">{user.email}</span>
        <UserCircleIcon className="h-6 w-6 text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {userMenuItems.map((item) => (
            <MenuItem key={item.name}>
              {({ focus }): JSX.Element => (
                <NavLink
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${focus ? 'bg-white/5 text-white' : 'text-gray-300'}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              )}
            </MenuItem>
          ))}
          <div className="border-t border-white/10 my-1" />
          <MenuItem>
            {({ focus }): JSX.Element => (
              <button
                onClick={onLogout}
                className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left ${focus ? 'bg-white/5 text-white' : 'text-gray-300'}`}
              >
                {t('header.logOut')}
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}