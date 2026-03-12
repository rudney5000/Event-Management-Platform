import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../entities/event/api/eventsApi";
import { EventDetailsLayout } from "../../widgets/event-details-layout/EventDetailsLayout";

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useGetEventByIdQuery(id!);

  return (
    <EventDetailsLayout
      event={event!}
      isLoading={isLoading}
      error={error}
    />
  );
}