import type {EventFormValues} from "../../../features/event-form";

export interface GetEventsParams {
  page: number;
  limit: number;
  lang?: string;
}

export interface PaginatedEvents {
  events: EventFull[];
  total: number;
}

export interface BrowseCity {
  id: string;
  slug: string;
  name: string;
  countryCode: string;
  currencyId: string;
}

export interface BrowseCurrency {
  id: string;
  code: string;
  name: string;
  symbol: string;
}

export interface BrowseResponse {
  city: BrowseCity;
  currency: BrowseCurrency;
  events: EventFull[];
  total: number;
  page: number;
  limit: number;
}

export interface Participant {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  registrationDate: string;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "free";
  paymentId?: string;
  ticketNumber?: string;
}

export interface EventBasePayload {
  date: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  priceType: "free" | "paid";
  price?: number;
  status: "draft" | "published";
  priority: string;
  categoryId?: string;
  currencyId?: string;
  organizerId?: string;
  imageUrl?: string;
  capacity?: number;
  availableSeats?: number;
  coordinates?: { lat: number; lng: number };
  bookingUrl?: string;
  level?: string;
  language?: string;
  cityId?: string;
  participants?: Participant[];
}

export interface EventTranslationPayload {
  lang: "fr" | "en" | "ru";
  title: string;
  city: string;
  address: string;
  shortDescription?: string;
  description?: string;
  tags?: string[];
  speakers?: string[];
  schedule?: { time: string; title: string; description?: string }[];
  sponsors?: string[];
  media?: { type: "video" | "image"; url: string }[];
}

export interface EventFull extends EventFormValues {
  imageUrl?: string;
  shortDescription?: string;
  description?: string;

  categoryId?: string;
  currencyId?: string;

  capacity?: number;
  availableSeats?: number;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  organizerId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  bookingUrl?: string;
  schedule?: { time: string; title: string; description?: string }[];
  level?: string;
  language?: string;
  sponsors?: string[];
  media?: { type: "video" | "image"; url: string }[];
  participants?: Participant[];
}