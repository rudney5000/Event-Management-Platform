import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Calendar, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetEventsQuery } from "../../entities/event/api/eventsApi";

interface EventSimilarProps {
  currentEventId: string;
  limit?: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  cityId?: string;
  categoryId?: string;
  price?: number;
  description?: string;
}

export function EventSimilar({ currentEventId, limit = 4 }: EventSimilarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { 
    data, 
    isLoading, 
    error 
  } = useGetEventsQuery({ 
    page: 1, 
    limit: 10
  });

  const similarEvents = useMemo(() => {
    if (!data?.events) return [];
    
    return data.events
      .filter((event: Event) => event.id !== currentEventId)
      .slice(0, limit)
      .map((event: Event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        imageUrl: event.imageUrl,
        cityId: event.cityId,
        categoryId: event.categoryId,
        price: event.price,
      }));
  }, [data, currentEventId, limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold mb-6">{t('eventPage.similarEvents', 'Similar Events')}</h3>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-white/10 rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 w-32 bg-white/10 rounded mb-2" />
                  <div className="h-4 w-24 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 rounded-2xl p-8 text-center">
        <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">{t('eventPage.similarEventsError', 'Unable to load similar events')}</p>
      </div>
    );
  }

  if (similarEvents.length === 0) {
    return (
      <div className="bg-white/5 rounded-2xl p-8 text-center">
        <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">{t('eventPage.noSimilarEvents', 'No similar events found')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{t('eventPage.similarEvents', 'Similar Events')}</h3>
        <button 
          onClick={() => navigate('/events')}
          className="text-sm text-[#f5c518] hover:text-[#f5c518]/80 flex items-center gap-1 transition-colors"
        >
          {t('eventPage.viewAll', 'View all')}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid gap-4">
        {similarEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02] group text-left"
          >
            <div className="flex gap-4 p-4">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-gray-500" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold mb-1 group-hover:text-[#f5c518] transition-colors truncate">
                  {event.title}
                </h4>
                
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.date)}
                  </span>
                  
                  {event.cityId && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.cityId}
                    </span>
                  )}
                </div>

                {event.price !== undefined && (
                  <div className="mt-2">
                    <span className="text-sm font-semibold text-[#f5c518]">
                      {event.price === 0 ? t('eventPage.free', 'Free') : `${event.price} €`}
                    </span>
                  </div>
                )}
              </div>

              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#f5c518] group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}