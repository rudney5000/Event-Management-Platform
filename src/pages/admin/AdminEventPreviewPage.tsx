import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Card,
  Typography,
  Tag,
  Image,
  Button,
  Badge,
  Avatar,
  Divider
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TagOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  LinkOutlined,
  StarOutlined
} from "@ant-design/icons";
import { useGetEventByIdQuery } from "../../entities/event/api/eventsApi";
import { useGetOrganizersQuery } from "../../entities/organizer";
import type { EventFormValues } from "../../features/event-form";
import { MapPinned } from 'lucide-react';

const { Title, Paragraph, Text, Link } = Typography;

export interface EventFull extends EventFormValues {
  imageUrl?: string;
  shortDescription?: string;
  description?: string;

  categoryId?: string;
  currencyId?: string;

  capacity?: number;
  availableSeats?: number;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  organizerId?: string;
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
  const { t } = useTranslation();

  const { data: event, isLoading } = useGetEventByIdQuery(id!);
  const { data: organizers } = useGetOrganizersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={() => navigate(-1)} 
          type="text"
          icon={<span>←</span>}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          {t("preview.backToEvents")}
        </Button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {event.imageUrl && (
            <div className="relative h-64 bg-gradient-to-r from-blue-400 to-purple-500">
              <Image
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
                preview={false}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-8 text-white">
                  <Title level={1} className="text-white mb-2">{event.title}</Title>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      color={event.status === "published" ? "green" : "orange"}
                      text={event.status === "published" ? t("preview.statusPublished") : t("preview.statusDraft")}
                      className="bg-white bg-opacity-20 text-white"
                    />
                    <Badge 
                      color="blue"
                      text={t("preview.priorityBadge", { priority: event.priority })}
                      className="bg-white bg-opacity-20 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!event.imageUrl && (
            <div className="relative h-64 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Title level={1} className="text-white mb-4">{event.title}</Title>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge 
                    color={event.status === "published" ? "green" : "orange"}
                    text={event.status === "published" ? t("preview.statusPublished") : t("preview.statusDraft")}
                    className="bg-white bg-opacity-20 text-white"
                  />
                  <Badge 
                    color="blue"
                    text={t("preview.priorityBadge", { priority: event.priority })}
                    className="bg-white bg-opacity-20 text-white"
                  />
                </div>
              </div>
            </div>
          )}

          <Card className="mx-6 -mt-8 relative z-10 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <CalendarOutlined className="text-blue-600 text-xl" />
                  <div>
                    <Text type="secondary" className="text-xs">{t("preview.date")}</Text>
                    <div className="font-semibold">{event.date}</div>
                    {event.endDate && <Text type="secondary">→ {event.endDate}</Text>}
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-3">
                  <MapPinned className="text-green-600 text-xl" />
                  <div>
                    <Text type="secondary" className="text-xs">{t("preview.location")}</Text>
                    <div className="font-semibold">{event.cityId}</div>
                    <Text type="secondary" className="text-sm">{event.address}</Text>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-3">
                  <DollarOutlined className="text-purple-600 text-xl" />
                  <div>
                    <Text type="secondary" className="text-xs">{t("preview.price")}</Text>
                    <div className="font-semibold">
                      {event.priceType === "free" ? t("preview.free") : t("preview.pricePaid", { price: event.price })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              {event.startTime && event.endTime && (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <ClockCircleOutlined className="text-gray-600" />
                  <Text>{event.startTime} - {event.endTime}</Text>
                </div>
              )}
              
              {event.capacity && (
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <TeamOutlined className="text-gray-600" />
                  <Text>{t("preview.seats", { available: event.availableSeats || 0, capacity: event.capacity })}</Text>
                </div>
              )}

              {event.level && (
                <Tag color="cyan" className="px-3 py-1">
                  <StarOutlined /> {event.level}
                </Tag>
              )}

              {event.language && (
                <Tag color="geekblue" className="px-3 py-1">
                  {event.language.toUpperCase()}
                </Tag>
              )}
            </div>

            {event.organizerId && organizers && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  {organizers.find(o => o.id === event.organizerId)?.logo && (
                    <Avatar 
                      src={organizers.find(o => o.id === event.organizerId)!.logo} 
                      size={64}
                      className="border-2 border-white shadow-md"
                    />
                  )}
                  <div className="flex-1">
                    <Text strong className="text-lg">{t("preview.organizer")}</Text>
                    <div className="text-gray-700 font-medium">
                      {organizers.find(o => o.id === event.organizerId)?.name}
                    </div>
                    {organizers.find(o => o.id === event.organizerId)?.contactEmail && (
                      <Text type="secondary" className="text-sm">
                        {organizers.find(o => o.id === event.organizerId)?.contactEmail}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            )}

            {event.tags && event.tags.length > 0 && (
              <div className="mb-6">
                <Text strong className="block mb-2">{t("preview.tags")}</Text>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Tag key={tag} color="default" className="px-3 py-1">
                      <TagOutlined /> {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-6">
                <Text strong className="block mb-2 flex items-center gap-2">
                  <UserOutlined /> {t("preview.speakers")}
                </Text>
                <div className="flex flex-wrap gap-2">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                      <Text className="font-medium">{speaker}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Divider />

            {event.shortDescription && (
              <div className="mb-6">
                <Text strong className="block mb-2">{t("preview.summary")}</Text>
                <Paragraph className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {event.shortDescription}
                </Paragraph>
              </div>
            )}

            {event.description && (
              <div className="mb-6">
                <Text strong className="block mb-2">{t("preview.fullDescription")}</Text>
                <Paragraph className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {event.description}
                </Paragraph>
              </div>
            )}

        <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {event.coordinates && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <Text strong className="block mb-2 flex items-center gap-2">
                    <MapPinned /> {t("preview.locationDetails")}
                  </Text>
                  <Text className="text-gray-700">
                    {t("preview.coordinates", { lat: event.coordinates.lat.toString(), lng: event.coordinates.lng.toString() })}
                  </Text>
                </div>
              )}

              {event.bookingUrl && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <Text strong className="block mb-2 flex items-center gap-2">
                    <LinkOutlined /> {t("preview.booking")}
                  </Text>
                  <Link href={event.bookingUrl} target="_blank" className="text-blue-600 hover:text-blue-800">
                    {t("preview.openBooking")}
                  </Link>
                </div>
              )}
            </div>

            {event.sponsors && event.sponsors.length > 0 && (
              <div className="mb-6">
                <Text strong className="block mb-2">{t("preview.sponsors")}</Text>
                <div className="flex flex-wrap gap-2">
                  {event.sponsors.map((sponsor, index) => (
                    <div key={index} className="bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                      <Text className="font-medium">🏆 {sponsor}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.media && event.media.length > 0 && (
              <div className="mb-6">
                <Text strong className="block mb-2">{t("preview.mediaGallery")}</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.media.map((m, i) =>
                    m.type === "video" ? (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <VideoCameraOutlined className="text-red-500 text-xl" />
                          <div>
                            <Text strong>{t("preview.video", { n: i + 1 })}</Text>
                            <div>
                              <Link href={m.url} target="_blank" className="text-blue-600 hover:text-blue-800">
                                {t("preview.watchVideo")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <div className="flex items-center gap-3">
                          <PictureOutlined className="text-green-500 text-xl" />
                          <Image src={m.url} alt={t("preview.mediaAlt", { n: i + 1 })} width={120} className="rounded" />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {event.schedule && event.schedule.length > 0 && (
              <div className="mb-6">
                <Text strong className="block mb-2 flex items-center gap-2">
                  <ClockCircleOutlined /> {t("preview.schedule")}
                </Text>
                <div className="space-y-2">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <Text strong className="text-blue-600">{item.time}</Text>
                        <div className="flex-1 ml-4">
                          <Text className="font-medium">{item.title}</Text>
                          {item.description && (
                            <Text type="secondary" className="block text-sm mt-1">
                              {item.description}
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}