import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import type { Notification } from '../model';

interface NotificationsMenuProps {
    notifications: Notification[];
}

export function NotificationsMenu({ notifications }: NotificationsMenuProps) {
    const { t } = useTranslation();

    return (
        <Menu as="div" className="relative">
            <MenuButton className="relative p-2 text-gray-400 hover:text-[#f5c518] transition-colors group">
                <span className="sr-only">{t('header.notifications')}</span>
                <BellIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-black animate-pulse" />
                )}
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-black border border-white/10 shadow-lg focus:outline-none z-50 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">{t('header.notifications')}</h3>
                        {notifications.length > 0 && (
                            <span className="text-xs text-[#f5c518]">{notifications.length} {t('header.newMessage')}</span>
                        )}
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-white/10">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer group"
                                >
                                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        {notif.message}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-xs text-gray-500">{notif.time}</p>
                                        {!notif.read && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#f5c518]"></span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center">
                            <BellIcon className="h-10 w-10 text-gray-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">{t('header.noNotifications')}</p>
                            <p className="text-xs text-gray-600 mt-1">
                                {t('header.noNotificationsMessage')}
                            </p>
                        </div>
                    )}
                </div>

                {notifications.length > 0 && (
                    <div className="p-3 border-t border-white/10 bg-white/5">
                        <button className="w-full text-center text-xs text-[#f5c518] hover:text-[#f5c518]/80 transition-colors">
                            {t('header.markAllAsRead')}
                        </button>
                    </div>
                )}
            </MenuItems>
        </Menu>
    );
}