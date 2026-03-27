import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PopoverGroup } from '@headlessui/react';
import { MOCK_NOTIFICATIONS, getMainNavLinks } from '../model';
import { SearchBar } from './SearchBar';
import { ProductsPopover } from './ProductsPopover';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';
import {useAppSelector, useUserMenu} from '../../../hooks';
import { LanguageSwitcher } from '../../../../features/change-language';
import { useLocalizedPath } from '../../../hooks/useLocalizedPath';
import {Heart} from "lucide-react";

export function Header() {
  const { t } = useTranslation();
  const localizedPath = useLocalizedPath();
  const [searchQuery, setSearchQuery] = useState('');
  const { open: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useUserMenu();
  const { user } = useCurrentUser();
  const likeIds = useAppSelector(state => state.likes.liked);
  const favoritesCount = Object.keys(likeIds).length;


  const mainNavLinks = getMainNavLinks(t).map((link) => ({
    ...link,
    to: localizedPath(link.to)
  }));

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <header className="bg-gray-900">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 gap-2">
        <div className="flex lg:flex-1">
          <Link to={localizedPath('/')} className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">{t('header.companyName')}</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
            <span className="text-white font-bold text-xl hidden sm:block">
              {t('header.companyName')}
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">{t('header.openMenu')}</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          <ProductsPopover />
          {mainNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }): string =>
                `text-sm/6 font-semibold transition-colors ${isActive ? 'text-indigo-400' : 'text-white hover:text-gray-300'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <LanguageSwitcher />
          <NotificationsMenu notifications={MOCK_NOTIFICATIONS} />
          <Link
              to={localizedPath('/event/favorites')}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {favoritesCount > 9 ? '9+' : favoritesCount}
          </span>
            )}
          </Link>
          <UserMenu user={user || null} onLogout={handleLogout} />
        </div>
      </nav>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        user={user || null}
        notifications={MOCK_NOTIFICATIONS}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onLogout={handleLogout}
      />
    </header>
  );
}