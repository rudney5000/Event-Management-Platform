import { Link } from "react-router";
import { useGetEventsQuery } from "../../entities/event/api/eventsApi";

export function EventPage() {
    const { data, isLoading, error } = useGetEventsQuery({ page: 1, limit: 10 });

    if (isLoading) return <div>Loading events...</div>;
    if (error) return <div>Failed to load events</div>;
    return (
        <div>
            <h1>Upcoming Events</h1>
            <ul>
                {data?.events.map((event) => (
                <li key={event.id}>
                    <Link to={`/event/${event.id}`}>
                    {event.title} - {event.date}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}