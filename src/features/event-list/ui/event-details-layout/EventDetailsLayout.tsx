import { useState } from "react";
import { EventGallery } from "../event-details-gallery";
import { EventTabs, type TabId } from "../event-details-tabs";
import { LikeButton } from "../../../like-event";
import type { EventFull } from '../../../../pages/admin/AdminEventPreviewPage.tsx';
import { useTranslation } from "react-i18next";
import { useGetCitiesQuery } from "../../../../entities/city/api/cityApi";

interface EventDetailsLayoutProps {
  event: EventFull;
  isLoading: boolean;
  error?: unknown;
}

export function EventDetailsLayout({ event, isLoading, error }: EventDetailsLayoutProps) {
  const { t } = useTranslation();
  const { data: cities } = useGetCitiesQuery();
  const [activeTab, setActiveTab] = useState<TabId>('details');

  const city = cities?.find(c => c.id === event.cityId);

  if (isLoading) return <div>{t('eventPage.loading')}</div>;
  if (error) return <div>{t('eventPage.error')}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-gray-500">{city?.name || 'Ville inconnue'}</p>
        </div>
        <LikeButton eventId={event.id} />
      </div>

      <EventGallery images={event.imageUrl || ''} />
      <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} event={event} />
    </div>
  );
}