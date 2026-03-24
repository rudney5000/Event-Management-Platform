import type { EventFull } from "../../../pages/admin/AdminEventPreviewPage";

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
