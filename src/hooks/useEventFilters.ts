import { useState, useMemo } from 'react';
import { toggleLike } from '../features/like-event'
import { useGetEventsQuery } from '../entities/event/api/eventsApi';
import { inferCategoryFromTitle } from '../entities/event/constants';
import type { EventFormValues } from '../features/event-form/ui/EventForm';
import { useAppDispatch, useAppSelector } from '../shared/hooks';

interface UseEventFiltersProps {
  page?: number;
  limit?: number;
}

interface UseEventFiltersReturn {
  data: { events: EventFormValues[]; total: number } | undefined;
  isLoading: boolean;
  error: unknown;
  selectedCategories: string[];
  priceFilter: 'all' | 'free' | 'paid';
  cityFilter: string;
  searchQuery: string;
  showFilters: boolean;
  sortBy: 'date' | 'price' | 'title';
  uniqueCities: string[];
  filteredEvents: EventFormValues[];
  setSelectedCategories: (categories: string[]) => void;
  setPriceFilter: (filter: 'all' | 'free' | 'paid') => void;
  setCityFilter: (city: string) => void;
  setSearchQuery: (query: string) => void;
  setShowFilters: (show: boolean) => void;
  setSortBy: (sort: 'date' | 'price' | 'title') => void;
  handleLike: (eventId: string) => void;
  toggleCategory: (id: string) => void;
  resetFilters: () => void;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  likeIds: string[];
}

const ITEMS_PER_PAGE = 8

export function useEventFilters({ page = 1, limit = 10 }: UseEventFiltersProps = {}): UseEventFiltersReturn {
  const { data, isLoading, error } = useGetEventsQuery({ page, limit });
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [cityFilter, setCityFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date');
  const [currentPage, setCurrentPage] = useState(1)


  const dispatch = useAppDispatch();
  const likeIds = useAppSelector(state => state.likes.likedIds);

  const uniqueCities = useMemo(() => {
    if (!data?.events) return [];
    return Array.from(new Set(data.events.map(e => e.city))).sort();
  }, [data?.events]);

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];

    return data.events
      .filter(event => {
        const category = inferCategoryFromTitle(event.title);
        if (selectedCategories.length && !selectedCategories.includes(category.id)) return false;
        if (priceFilter === 'free' && event.priceType !== 'free') return false;
        if (priceFilter === 'paid' && event.priceType !== 'paid') return false;
        if (cityFilter && event.city !== cityFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return event.title.toLowerCase().includes(q)
            || event.city.toLowerCase().includes(q)
            || (event.speakers?.some(s => s.toLowerCase().includes(q)));
        }
        return true;
      })
      .sort((a, b) => {
        switch(sortBy) {
          case 'date': return new Date(a.date).getTime() - new Date(b.date).getTime();
          case 'price': return (a.price || 0) - (b.price || 0);
          case 'title': return a.title.localeCompare(b.title);
          default: return 0;
        }
      });
  }, [data?.events, selectedCategories, priceFilter, cityFilter, searchQuery, sortBy]);

  const handleLike = (eventId: string) => {
    dispatch(toggleLike(eventId));
  };

  const toggleCategory = (id: string) => setSelectedCategories(prev =>
    prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
  );

  const totalPages = Math.max(1, Math.ceil((filteredEvents.length ?? 0) / ITEMS_PER_PAGE))

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceFilter('all');
    setCityFilter('');
    setSearchQuery('');
    setSortBy('date');
  };

  return {
    data,
    isLoading,
    error,
    selectedCategories,
    priceFilter,
    cityFilter,
    searchQuery,
    showFilters,
    sortBy,
    uniqueCities,
    filteredEvents,
    setSelectedCategories,
    setPriceFilter,
    setCityFilter,
    setSearchQuery,
    setShowFilters,
    setSortBy,
    handleLike,
    toggleCategory,
    resetFilters,
    currentPage,
    totalPages,
    setCurrentPage,
    likeIds
  };
}
