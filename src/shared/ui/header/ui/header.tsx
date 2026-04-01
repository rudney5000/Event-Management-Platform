import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PopoverGroup } from '@headlessui/react';
import { MOCK_NOTIFICATIONS, getMainNavLinks } from '../model';
import { SearchBar } from './SearchBar';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';
import { useAppSelector, useUserMenu } from '../../../hooks';
import { LanguageSwitcher } from '../../../../features/change-language';
import { useLocalizedPath } from '../../../hooks/useLocalizedPath';
import { Heart, Calendar } from "lucide-react";

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
      <header className="bg-black border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm bg-black/80">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 gap-2">
          <div className="flex lg:flex-1">
            <Link to={localizedPath('/')} className="-m-1.5 p-1.5 flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#f5c518] rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-black" />
              </div>
              <span className="text-white font-bold text-xl hidden sm:block group-hover:text-[#f5c518] transition-colors">
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
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="sr-only">{t('header.openMenu')}</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <PopoverGroup className="hidden lg:flex lg:gap-x-8">
            {mainNavLinks.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.to}
                    className={({ isActive }): string =>
                        `text-sm/6 font-semibold transition-all duration-300 ${
                            isActive
                                ? 'text-[#f5c518] border-b-2 border-[#f5c518] pb-1'
                                : 'text-gray-300 hover:text-white'
                        }`
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
                className="relative p-2 text-gray-400 hover:text-[#f5c518] transition-colors"
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