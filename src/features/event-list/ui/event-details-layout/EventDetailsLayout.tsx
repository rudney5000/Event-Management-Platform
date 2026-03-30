import { useState } from "react";
// import { EventGallery } from "../event-details-gallery";
import { EventTabs, type TabId } from "../event-details-tabs";
import { LikeButton } from "../../../like-event";
import type { EventFull } from '../../../../pages/admin/AdminEventPreviewPage.tsx';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ChevronLeft, Clock, MapPin, Share2, Tag } from "lucide-react";
import { TicketCard } from "../ui/TicketCard.tsx";

interface EventDetailsLayoutProps {
  event: EventFull;
  isLoading: boolean;
  error?: unknown;
}

export function EventDetailsLayout({ event, isLoading, error }: EventDetailsLayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('details');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#f5c518] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">{t('eventPage.loading')}</p>
        </div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-red-400">{t('eventPage.error')}</p>
      </div>
    );
  }

    const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('fr-FR', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      })
    : null;
 
  const formattedTime = event.date
    ? new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

    
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
 
      <div className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        {event.imageUrl ? (
          <>
            <div
              className="absolute inset-0 scale-110"
              style={{
                backgroundImage: `url(${event.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(40px) brightness(0.35)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]" />
 
            <div className="relative h-full flex items-center justify-center px-6">
              <div className="relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-[340px] w-auto max-w-[300px] rounded-2xl object-cover shadow-2xl shadow-black/60"
                />
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <LikeButton eventId={event.id} />
                  <button className="p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        )}
 
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>
      </div>
 
      <div className="max-w-5xl mx-auto px-6 -mt-2 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
 
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-black tracking-tight mb-2 leading-none">
              {event.title}
            </h1>
 
            {event.organizerId && (
              <p className="text-gray-400 text-base mb-5">{event.organizerId}</p>
            )}
 
            <div className="flex flex-wrap gap-3 mb-8">
              {formattedDate && (
                <span className="flex items-center gap-1.5 text-[#f5c518] text-sm font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  {formattedDate}{formattedTime && `, ${formattedTime}`}
                </span>
              )}
              {event.categoryId && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm border border-white/10 rounded-full px-3 py-0.5">
                  <Tag className="w-3 h-3" />
                  {event.categoryId}
                </span>
              )}
              {event.cityId && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm border border-white/10 rounded-full px-3 py-0.5">
                  <MapPin className="w-3 h-3" />
                  {event.cityId}
                </span>
              )}
            </div>
 
            <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} event={event} />
          </div>
 
          <div className="lg:w-72 shrink-0">
            <div className="sticky top-8">
              <TicketCard event={event} />
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}