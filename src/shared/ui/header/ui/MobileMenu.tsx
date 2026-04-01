import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import {BellIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/outline';
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
} from '../model';
import { LanguageSwitcher } from '../../../../features/change-language';
import { useLocalizedPath } from '../../../hooks/useLocalizedPath';
import { Heart, Calendar } from 'lucide-react';

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
  const localizedPath = useLocalizedPath();
  const [showNotifications, setShowNotifications] = useState(false);

  const products = getProducts(t);
  const callsToAction = getCallsToAction(t);
  const mainNavLinks = getMainNavLinks(t).map((link) => ({
    ...link,
    to: localizedPath(link.to),
  }));
  const userMenuItems = getUserMenuItems(t).map((item) => ({
    ...item,
    to: localizedPath(item.to),
  }));

  return (
      <Dialog open={open} onClose={onClose} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black border-l border-white/10 p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link to={localizedPath('/')} className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#f5c518] rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-black" />
              </div>
              <span className="text-white font-bold text-xl">{t('header.companyName')}</span>
            </Link>
            <button
                type="button"
                onClick={onClose}
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
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
                  className="w-full px-4 py-2.5 pl-10 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c518] transition-colors"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5 transition-colors">
                    {t('header.product')}
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400 group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={NavLink}
                            to={localizedPath(item.href)}
                            onClick={onClose}
                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
                            `-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-colors ${
                                isActive
                                    ? 'text-[#f5c518] bg-white/5'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`
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
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
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

                <div className="px-3">
                  <Link
                      to={localizedPath('/event/favorites')}
                      onClick={onClose}
                      className="flex items-center gap-2 text-gray-300 hover:text-[#f5c518] transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">{t('header.favorites')}</span>
                  </Link>
                </div>

                {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-sm text-gray-400 border-t border-white/10 pt-4">
                        {t('header.welcome')}, <span className="text-[#f5c518]">{user.email}</span>
                      </div>
                      {userMenuItems.map((item) => (
                          <NavLink
                              key={item.name}
                              to={item.to}
                              onClick={onClose}
                              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              {item.name}
                            </div>
                          </NavLink>
                      ))}
                      <button
                          onClick={() => {
                            onLogout();
                            onClose();
                          }}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors w-full text-left"
                      >
                        {t('header.logOut')}
                      </button>
                    </div>
                ) : (
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <Link
                          to={localizedPath('/login')}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2.5 text-center text-base/7 font-semibold text-white border border-white/20 hover:bg-white/5 transition-colors"
                      >
                        {t('header.logIn')}
                      </Link>
                      <Link
                          to={localizedPath('/register')}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2.5 text-center text-base/7 font-semibold bg-[#f5c518] text-black hover:bg-[#f5c518]/90 transition-colors"
                      >
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