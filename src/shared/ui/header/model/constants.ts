import type { TFunction } from 'i18next';
import type { ComponentType } from 'react';
import {
  CalendarDaysIcon,
  CalendarIcon,
  HeartIcon,
  PlusCircleIcon,
  StarIcon,
  TagIcon,
  TicketIcon,
  UserCircleIcon,
  UsersIcon,
} from 'lucide-react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export interface ProductItem {
  name: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface CallToActionItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavLinkItem {
  name: string;
  to: string;
}

export interface UserMenuItem {
  name: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
}

export const getProducts = (t: TFunction): ProductItem[] => [
  { name: t('header.products.events.name'), description: t('header.products.events.description'), href: '/events', icon: CalendarIcon },
  { name: t('header.products.categories.name'), description: t('header.products.categories.description'), href: '/categories', icon: TagIcon },
  { name: t('header.products.calendar.name'), description: t('header.products.calendar.description'), href: '/calendar', icon: CalendarDaysIcon },
  { name: t('header.products.organizers.name'), description: t('header.products.organizers.description'), href: '/organizers', icon: UsersIcon },
];

export const getCallsToAction = (t: TFunction): CallToActionItem[] => [
  { name: t('header.callsToAction.createEvent'), href: '/create-event', icon: PlusCircleIcon },
  { name: t('header.callsToAction.becomeOrganizer'), href: '/become-organizer', icon: StarIcon },
];

export const getMainNavLinks = (t: TFunction): NavLinkItem[] => [
  { name: t('header.navigation.home'), to: '/' },
  { name: t('header.navigation.events'), to: '/events' },
  { name: t('header.navigation.about'), to: '/about' },
  { name: t('header.navigation.contact'), to: '/contact' },
];

export const getUserMenuItems = (t: TFunction): UserMenuItem[] => [
  { name: t('header.userMenu.profile'), to: '/profile', icon: UserCircleIcon },
  { name: t('header.userMenu.myEvents'), to: '/my-events', icon: CalendarIcon },
  { name: t('header.userMenu.myTickets'), to: '/my-tickets', icon: TicketIcon },
  { name: t('header.userMenu.favorites'), to: '/favorites', icon: HeartIcon },
  { name: t('header.userMenu.settings'), to: '/settings', icon: Cog6ToothIcon },
];

export interface Notification {
  id: number;
  message: string;
  time: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, message: 'Nouvel événement créé', time: '5 min' },
  { id: 2, message: 'Votre billet est confirmé', time: '1 heure' },
];