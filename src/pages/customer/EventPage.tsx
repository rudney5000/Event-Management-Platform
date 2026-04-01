import { useTranslation } from "react-i18next";
import { EventFilters } from "../../features/event-filters";
import { EventCard } from "../../features/event-list";
import { useEventFilters } from "../../hooks/useEventFilters";
import Footer from "../../shared/ui/footer/Footer";
import Pagination from "../../shared/ui/pagination/Pagination";
import { Chat } from "../../features/event-chat/ui/Chat.tsx";
import { useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";

export function EventPage() {
    const { t } = useTranslation();
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

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentEventId, setCurrentEventId] = useState<string | null>(filteredEvents[0]?.id ?? null);
    const [currentEventTitle, setCurrentEventTitle] = useState<string>("");

    if (isLoading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-lg">{t('eventPage.loading')}</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-lg">{t('eventPage.error')}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black">
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#f5c518]/20 p-4 rounded-full">
                            <Calendar className="w-12 h-12 text-[#f5c518]" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('eventPage.title', 'Événements')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {t('eventPage.subtitle', 'Découvrez les meilleurs événements près de chez vous')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

                {filteredEvents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                            <p className="text-gray-400">{t('eventPage.noEvents')}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                isLiked={!!likeIds[event.id]}
                                onLike={handleLike}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-12">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                <button
                    onClick={() => {
                        const firstEvent = filteredEvents[0];
                        if (!firstEvent) return;
                        setCurrentEventId(firstEvent.id);
                        setCurrentEventTitle(firstEvent.title);
                        setIsChatOpen(true);
                    }}
                    className="fixed bottom-6 right-6 bg-[#f5c518] text-black p-4 rounded-full shadow-lg hover:bg-[#f5c518]/90 transition-all hover:scale-110 z-50"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>

                {isChatOpen && currentEventId && (
                    <Chat
                        eventId={currentEventId}
                        eventTitle={currentEventTitle}
                        isOpen={isChatOpen}
                        onClose={() => setIsChatOpen(false)}
                    />
                )}

                <div className="mt-16">
                    <Footer />
                </div>
            </div>
        </div>
    );
}