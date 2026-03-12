import { useState, useMemo } from "react";
import { useGetEventsQuery } from "../../entities/event/api/eventsApi";
import { EventFilters } from "../../features/event-filters/EventFilters";
import { inferCategoryFromTitle } from "../../entities/event/constants";
import { EventCard } from "../../features/event-list";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { toggleLike } from "../../features/like-event";

export function EventPage() {
    const { data, isLoading, error } = useGetEventsQuery({ page: 1, limit: 10 });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
    const [cityFilter, setCityFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date');

    const dispatch = useAppDispatch()
    const likeIds = useAppSelector(state => state.likes.likedIds)

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
        dispatch(toggleLike(eventId))
    }

    const toggleCategory = (id: string) => setSelectedCategories(prev =>
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceFilter('all');
        setCityFilter('');
        setSearchQuery('');
        setSortBy('date');
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center">Erreur de chargement</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <EventFilters
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    cityFilter={cityFilter}
                    setCityFilter={setCityFilter}
                    uniqueCities={uniqueCities}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resetFilters={resetFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            isLiked={likeIds.includes(event.id)}
                            onLike={handleLike}
                        />
                    ))}
                </div>
                {filteredEvents.length === 0 && <p className="text-center mt-8">Aucun événement trouvé.</p>}
            </div>
        </div>
    );
}