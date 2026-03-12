import { useState } from "react";
import { LikeButton } from "../../features/like-event";
import type { EventFull } from "../../pages/admin/AdminEventPreviewPage";
import { EventGallery } from "../event-details-gallery";
import { EventTabs, type TabId } from "../event-details-tabs";

interface EventDetailsLayoutProps {
  event: EventFull;
  isLoading: boolean;
  error?: unknown;
}

export function EventDetailsLayout({ event, isLoading, error }: EventDetailsLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabId>('details');

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-gray-500">{event.city}</p>
        </div>
        <LikeButton eventId={event.id} />
      </div>

      <EventGallery images={event.imageUrl || []} />
      <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} event={event} />
    </div>
  );
}