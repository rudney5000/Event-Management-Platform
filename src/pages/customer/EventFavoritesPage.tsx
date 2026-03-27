import {useTranslation} from "react-i18next";
import {useGetEventsQuery} from "../../entities/event/api/eventsApi.ts";
import {useAppDispatch, useAppSelector} from "../../shared/hooks";
import {useMemo} from "react";
import {EventCard} from "../../features/event-list";
import Footer from "../../shared/ui/footer/Footer.tsx";
import {toggleLike} from "../../features/like-event";

export function EventFavoritesPage() {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetEventsQuery({ page: 1, limit: 100, lang: i18n.language });
    const likeIds = useAppSelector(state => state.likes.liked);

    const favoriteEvents = useMemo(() => {
        if (!data?.events) return [];
        return data.events.filter(event => likeIds[event.id]);
    }, [data, likeIds]);

    const handleLike = (eventId: string) => {
        dispatch(toggleLike(eventId));
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            {t('favoritesPage.loading')}
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            {t('favoritesPage.error')}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {t('favoritesPage.title')}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {t('favoritesPage.subtitle', { count: favoriteEvents.length })}
                    </p>
                </div>

                {favoriteEvents.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">❤️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t('favoritesPage.noFavorites')}
                        </h3>
                        <p className="text-gray-600">
                            {t('favoritesPage.noFavoritesMessage')}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                isLiked={true}
                                onLike={handleLike}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}