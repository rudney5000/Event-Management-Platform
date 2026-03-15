import { useTranslation } from "react-i18next";
import { EventFilters } from "../../features/event-filters/EventFilters";
import { EventCard } from "../../features/event-list";
import { useEventFilters } from "../../hooks/useEventFilters";
import Footer from "../../shared/ui/footer/Footer";
import Pagination from "../../shared/ui/pagination/Pagination";

export function EventPage() {
    const { t } = useTranslation()
    const {
        isLoading,
        error,
        selectedCategories,
        priceFilter,
        cityFilter,
        showFilters,
        sortBy,
        uniqueCities,
        filteredEvents,
        setPriceFilter,
        setCityFilter,
        setShowFilters,
        setSortBy,
        handleLike,
        toggleCategory,
        resetFilters,
        currentPage,
        totalPages,
        setCurrentPage,
        likeIds
    } = useEventFilters({ page: 1, limit: 10 });

     if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            {t('eventPage.loading')}
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            {t('eventPage.error')}
        </div>
    );

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
                
                {filteredEvents.length === 0 && (
                    <p className="text-center mt-8">{t('eventPage.noEvents')}</p>
                )}
                
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
                
                <div className="mt-8">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}