import { useMemo, useState } from "react";
import { EventTabs, type TabId } from "../event-list/ui/event-details-tabs/index.ts";
import type { EventFull } from '../../pages/admin/AdminEventPreviewPage.tsx';
import { useTranslation } from "react-i18next";
import { TicketCard } from "../event-list/ui/ui/TicketCard.tsx";
import { EventLoadingSkeleton } from "./EventLoadingSkeleton.tsx";
import { EventErrorDisplay } from "./EventErrorDisplay.tsx";
import { EventHero } from "./EventHero.tsx";
import { EventHeader } from "./EventHeader.tsx";
import { EventActions } from "./EventActions.tsx";
import { EventVenue } from "./EventVenue.tsx";
import { EventLineup } from "./EventLineup.tsx";
import { EventSimilar } from "./EventSimilar.tsx";

interface EventDetailsLayoutProps {
  event: EventFull;
  isLoading: boolean;
  error?: unknown;
  onRetry?: () => void;
}

export function EventDetailsLayout({ 
  event, 
  isLoading, 
  error, 
  onRetry 
}: EventDetailsLayoutProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>('details');
  
  const { formattedDate, formattedTime } = useMemo(() => ({
    formattedDate: event?.date ? new Date(event.date).toLocaleDateString('fr-FR', {
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    }) : null,
    formattedTime: event?.date ? new Date(event.date).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }) : null,
  }), [event?.date]);

  const handleShare = (shareEvent: EventFull) => {
    if (navigator.share) {
      navigator.share({
        title: shareEvent.title,
        text: t('eventPage.shareText'),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return <EventLoadingSkeleton />;
  }

  if (error || !event) {
    return <EventErrorDisplay error={error} onRetry={onRetry} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <EventHero event={event} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EventHeader 
              title={event.title}
              organizer={event.organizerId}
              formattedDate={formattedDate}
              formattedTime={formattedTime}
              category={event.categoryId}
              city={event.cityId}
            />

            <EventActions 
              eventId={event.id}
              onShare={() => handleShare(event)}
            />

            <EventTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              event={event}
            />

            {activeTab === 'location' && (
              <EventVenue 
                address={event.address}
                cityId={event.cityId}
              />
            )}

            {activeTab === 'speakers' && event.speakers && (
              <EventLineup artists={event.speakers} />
            )}

            {activeTab === 'reviews' && (
              <EventSimilar currentEventId={event.id} />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TicketCard event={event} />
              
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>{t('eventPage.ticketsPoweredBy', 'Secure checkout powered by TicketMaster')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}