import { Link } from "react-router";
import {
    Calendar,
    MapPin,
    Users,
    Heart,
    ExternalLink,
    Ticket
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type {EventFull} from "../../entities/event/model";
import {useGetCategoriesQuery} from "../../entities/category";
import {useGetOrganizersQuery} from "../../entities/organizer";
import {useGetCitiesQuery} from "../../entities/city";
import {useLocalizedPath} from "../../shared/hooks/useLocalizedPath.ts";

interface Props {
    event: EventFull;
    isLiked: boolean;
    onLike: (id: string) => void;
}

export function EventCard({ event, isLiked, onLike }: Props) {
    const { t } = useTranslation();
    const { data: categories } = useGetCategoriesQuery();
    const { data: organizers } = useGetOrganizersQuery();
    const { data: cities } = useGetCitiesQuery();
    const path = useLocalizedPath();
    
    const category = categories?.find(cat => cat.id === event.categoryId);
    const organizer = organizers?.find(org => org.id === event.organizerId);
    const city = cities?.find(c => c.id === event.cityId);

    return (
        <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#f5c518]/50 hover:shadow-xl hover:shadow-[#f5c518]/5 transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-r from-indigo-900 to-purple-900">
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-purple-800" />
                )}

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                {category && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            {category.icon}
                            {category.name}
                        </span>
                    </div>
                )}

                {isLiked && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-red-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Heart className="w-3 h-3 fill-current" />
                            {t('eventCard.favorite')}
                        </span>
                    </div>
                )}

                <div className="absolute bottom-4 right-4">
                    <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                        {event.priceType === 'free'
                            ? `🎟️ ${t('eventCard.free')}`
                            : `${event.price} ${event.currencyId || '€'}`
                        }
                    </span>
                </div>

                {event.priority === "1" && (
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-[#f5c518]/90 text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            ⭐ {t('eventCard.priority')}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#f5c518] transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-[#f5c518]" />
                        <span>
                            {new Date(event.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    <div className="flex items-start text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-[#f5c518]" />
                        <span>
                            {city?.name || event.cityId}
                            {event.address && (
                                <span className="block text-xs text-gray-500">{event.address}</span>
                            )}
                        </span>
                    </div>

                    {event.speakers && event.speakers.length > 0 && (
                        <div className="flex items-center text-gray-400 text-sm">
                            <Users className="w-4 h-4 mr-2 flex-shrink-0 text-[#f5c518]" />
                            <span className="truncate">{event.speakers.slice(0, 2).join(', ')}</span>
                        </div>
                    )}

                    {organizer && (
                        <div className="flex items-center text-gray-400 text-sm">
                            <Ticket className="w-4 h-4 mr-2 flex-shrink-0 text-[#f5c518]" />
                            <span>{organizer.name}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                        onClick={() => onLike(event.id)}
                        aria-label={t('eventCard.favorite')}
                        className={`p-2 rounded-lg transition-all ${
                            isLiked
                                ? 'text-red-500 bg-red-500/10'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    <Link
                        to={path(`/event/${event.id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black text-sm font-medium rounded-lg hover:bg-[#f5c518]/90 transition-colors"
                    >
                        <span>{t('eventCard.view')}</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}