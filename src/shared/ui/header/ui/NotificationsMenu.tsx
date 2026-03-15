import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import type { Notification } from '../model/constants';

interface NotificationsMenuProps {
  notifications: Notification[];
}

export function NotificationsMenu({ notifications }: NotificationsMenuProps) {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative p-2 text-gray-400 hover:text-white transition-colors">
        <span className="sr-only">{t('header.notifications')}</span>
        <BellIcon className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900" />
        )}
      </MenuButton>

      <MenuItems className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-white mb-3">{t('header.notifications')}</h3>
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="text-sm text-gray-300 hover:bg-white/5 p-2 rounded-lg">
                  <p>{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">{t('header.noNotifications')}</p>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}