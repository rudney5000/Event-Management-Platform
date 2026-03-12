import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Tag, Image, Space, Button } from "antd";
import { useGetEventByIdQuery } from "../../entities/event/api/eventsApi";
import type { EventFormValues } from "../../features/event-form/ui/EventForm";

const { Title, Paragraph, Text, Link } = Typography;

export interface EventFull extends EventFormValues {
  imageUrl?: string[];
  shortDescription?: string;
  description?: string;

  categoryId?: string;
  currencyId?: string;

  capacity?: number;
  availableSeats?: number;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  organizer?: {
    name: string;
    logo?: string;
    contactEmail?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  bookingUrl?: string;
  schedule?: { time: string; title: string; description?: string }[];
  level?: string;
  language?: string;
  sponsors?: string[];
  media?: { type: "video" | "image"; url: string }[];
}

export function AdminEventPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: event, isLoading } = useGetEventByIdQuery(id!);

  if (isLoading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        ← Back
      </Button>

      <Card>
        {event.imageUrl && event.imageUrl.length > 0 && (
          <Image.PreviewGroup>
            <div className="flex gap-4 overflow-x-auto">
              {event.imageUrl.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`${event.title} - image ${index + 1}`}
                  width={200}
                  height={150}
                  className="rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </Image.PreviewGroup>
        )}
        <Title level={2}>{event.title}</Title>
        <Space size="middle" wrap>
          <Tag color="blue">{event.categoryId}</Tag>
          <Tag color={event.status === "published" ? "green" : "orange"}>{event.status}</Tag>
          <Tag color="purple">Priority: {event.priority}</Tag>
          <Tag color={event.priceType === "free" ? "green" : "blue"}>
            {event.priceType === "free" ? "Free" : `${event.price} €`}
          </Tag>
        </Space>

        <Paragraph>
          <Text strong>Date:</Text> {event.date}
          {event.endDate && ` → ${event.endDate}`}
        </Paragraph>
        {event.startTime && event.endTime && (
          <Paragraph>
            <Text strong>Time:</Text> {event.startTime} - {event.endTime}
          </Paragraph>
        )}

        <Paragraph>
          <Text strong>Location:</Text> {event.address}, {event.city}
        </Paragraph>

        {event.organizer && (
          <Paragraph>
            <Text strong>Organizer:</Text> {event.organizer.name}{" "}
            {event.organizer.logo && <Image src={event.organizer.logo} alt="logo" width={50} />}
            {event.organizer.contactEmail && <Text> ({event.organizer.contactEmail})</Text>}
          </Paragraph>
        )}

        {event.tags && event.tags.length > 0 && (
          <Paragraph>
            <Text strong>Tags:</Text>{" "}
            {event.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Paragraph>
        )}

        {event.speakers && event.speakers.length > 0 && (
          <Paragraph>
            <Text strong>Speakers:</Text> {event.speakers.join(", ")}
          </Paragraph>
        )}

        {event.shortDescription && (
          <Paragraph>
            <Text strong>Short Description:</Text> {event.shortDescription}
          </Paragraph>
        )}

        {event.description && (
          <Paragraph>
            <Text strong>Description:</Text> {event.description}
          </Paragraph>
        )}

        {event.coordinates && (
          <Paragraph>
            <Text strong>Coordinates:</Text> {event.coordinates.lat}, {event.coordinates.lng}
          </Paragraph>
        )}

        {event.bookingUrl && (
          <Paragraph>
            <Link href={event.bookingUrl} target="_blank">
              Booking Link
            </Link>
          </Paragraph>
        )}

        {event.sponsors && event.sponsors.length > 0 && (
          <Paragraph>
            <Text strong>Sponsors:</Text> {event.sponsors.join(", ")}
          </Paragraph>
        )}

        {event.media && event.media.length > 0 && (
          <Paragraph>
            <Text strong>Media:</Text>
            <Space direction="vertical">
              {event.media.map((m, i) =>
                m.type === "video" ? (
                  <Link key={i} href={m.url} target="_blank">
                    Video {i + 1}
                  </Link>
                ) : (
                  <Image key={i} src={m.url} alt={`Media ${i + 1}`} width={200} />
                )
              )}
            </Space>
          </Paragraph>
        )}

        {event.level && <Paragraph><Text strong>Level:</Text> {event.level}</Paragraph>}
        {event.language && <Paragraph><Text strong>Language:</Text> {event.language}</Paragraph>}
      </Card>
    </div>
  );
}