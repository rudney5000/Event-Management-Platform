import { useTranslation } from 'react-i18next';
import { useGetEventsQuery } from '../../entities/event/api/eventsApi.ts';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { useMemo, useState } from 'react';
import { EventCard } from '../../features/event-list';
import Footer from '../../shared/ui/footer/Footer.tsx';
import { toggleLike } from '../../features/like-event';

export function EventFavoritesPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetEventsQuery({
    page: 1,
    limit: 100,
    lang: i18n.language,
  });
  const likeIds = useAppSelector((state) => state.likes.liked);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'category'>('date');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const favoriteEvents = useMemo(() => {
    if (!data?.events) return [];
    let filtered = data.events.filter((event) => likeIds[event.id]);

    if (filterCategory !== 'all') {
      filtered = filtered.filter((event) => event.categoryId === filterCategory);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return (a.categoryId || '').localeCompare(b.categoryId || '');
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [data, likeIds, sortBy, filterCategory]);

  const categories = useMemo(() => {
    if (!data?.events) return [];
    const eventsWithLikes = data.events.filter((event) => likeIds[event.id]);
    return [...new Set(eventsWithLikes.map((event) => event.categoryId).filter(Boolean))];
  }, [data, likeIds]);

  const handleLike = (eventId: string) => {
    dispatch(toggleLike(eventId));
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t('favoritesPage.loading')}
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t('favoritesPage.error')}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('favoritesPage.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('favoritesPage.subtitle', { count: favoriteEvents.length })}
          </p>
        </div>

        {favoriteEvents.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">{t('filters.allCategories', 'All Categories')}</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {t(`eventCategories.${category}`, category || '')}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'category')}
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="date">{t('filters.sortDate')}</option>
                    <option value="title">{t('filters.sortTitle')}</option>
                    <option value="category">{t('filters.categories')}</option>
                  </select>
                  <svg
                    className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {favoriteEvents.length}{' '}
                {t('favoritesPage.subtitle', { count: favoriteEvents.length })}
              </div>
            </div>
          </div>
        )}

        {favoriteEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t('favoritesPage.noFavorites')}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {t('favoritesPage.noFavoritesMessage')}
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105">
              {t('eventPage.browseEvents', 'Browse Events')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEvents.map((event) => (
              <div key={event.id} className="transform transition-all duration-300 hover:scale-105">
                <EventCard event={event} isLiked={true} onLike={handleLike} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}