import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { NavLink, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { UserCircleIcon, ChevronDown } from 'lucide-react';
import { getUserMenuItems } from '../model';
import { useLocalizedPath } from '../../../hooks/useLocalizedPath';

interface User {
    email: string;
}

interface UserMenuProps {
    user: User | null;
    onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
    const { t } = useTranslation();
    const localizedPath = useLocalizedPath();
    const userMenuItems = getUserMenuItems(t).map((item) => ({
        ...item,
        to: localizedPath(item.to),
    }));

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    to={localizedPath('/login')}
                    className="text-sm font-semibold text-gray-300 hover:text-white transition-colors px-3 py-2"
                >
                    {t('header.logIn')}
                </Link>
                <Link
                    to={localizedPath('/register')}
                    className="text-sm font-semibold bg-[#f5c518] text-black px-4 py-2 rounded-lg hover:bg-[#f5c518]/90 transition-colors"
                >
                    {t('header.signUp')}
                </Link>
            </div>
        );
    }

    return (
        <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors group">
                <span className="hidden xl:block">{user.email}</span>
                <div className="flex items-center gap-1">
                    <UserCircleIcon className="h-6 w-6 text-gray-400 group-hover:text-[#f5c518] transition-colors" />
                    <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-[#f5c518] transition-colors" />
                </div>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-black border border-white/10 shadow-lg focus:outline-none z-50 overflow-hidden">
                <div className="py-2">
                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                    </div>

                    {userMenuItems.map((item) => (
                        <MenuItem key={item.name}>
                            {({ focus }) => (
                                <NavLink
                                    to={item.to}
                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                        focus ? 'bg-white/5 text-[#f5c518]' : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </NavLink>
                            )}
                        </MenuItem>
                    ))}

                    <div className="border-t border-white/10 my-2" />

                    <MenuItem>
                        {({ focus }) => (
                            <button
                                onClick={onLogout}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm w-full text-left transition-colors ${
                                    focus ? 'bg-white/5 text-red-400' : 'text-red-400 hover:text-red-300'
                                }`}
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t('header.logOut')}
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}