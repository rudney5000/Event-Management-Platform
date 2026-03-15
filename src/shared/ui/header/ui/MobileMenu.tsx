import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  getCallsToAction,
  getMainNavLinks,
  getProducts,
  getUserMenuItems,
  type Notification,
} from '../model/constants';
import { LanguageSwitcher } from '../../../../features/change-language';

interface User {
  email: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  notifications: Notification[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogout: () => void;
}

export function MobileMenu({ open, onClose, user, notifications, searchQuery, onSearchChange, onLogout }: MobileMenuProps) {
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);

  const products = getProducts(t);
  const callsToAction = getCallsToAction(t);
  const mainNavLinks = getMainNavLinks(t);
  const userMenuItems = getUserMenuItems(t);

  return (
    <Dialog open={open} onClose={onClose} className="lg:hidden">
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">{t('header.companyName')}</span>
            <img alt="" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-auto" />
            <span className="text-white font-bold text-xl">{t('header.companyName')}</span>
          </Link>
          <button type="button" onClick={onClose} className="-m-2.5 rounded-md p-2.5 text-gray-400">
            <span className="sr-only">{t('header.closeMenu')}</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full px-4 py-2 pl-10 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-white/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                  {t('header.product')}
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {[...products, ...callsToAction].map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as={NavLink}
                      to={item.href}
                      className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              {mainNavLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }): string =>
                    `-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${isActive ? 'text-indigo-400 bg-white/5' : 'text-white hover:bg-white/5'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="py-6 space-y-4">
              <div className="px-3">
                <LanguageSwitcher />
              </div>

              <div className="px-3">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="text-sm">{t('header.notifications')}</span>
                  {notifications.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-gray-400">
                    {t('header.welcome')}, {user.email}
                  </div>
                  {userMenuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      onClick={onClose}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </div>
                    </NavLink>
                  ))}
                  <button
                    onClick={onLogout}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5 w-full text-left"
                  >
                    {t('header.logOut')}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={onClose} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5">
                    {t('header.logIn')}
                  </Link>
                  <Link to="/signup" onClick={onClose} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 text-center">
                    {t('header.signUp')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}