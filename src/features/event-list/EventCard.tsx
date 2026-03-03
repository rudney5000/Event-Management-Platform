import { Link } from "react-router";
import { inferCategoryFromTitle } from "../../entities/event/constants";
import { Calendar, MapPin, Users, Heart, Info, ExternalLink } from "lucide-react";
import type { EventFull } from "../../pages/admin/AdminEventPreviewPage";

interface Props {
    event: EventFull;
    isLiked: boolean;
    onLike: (id: string) => void;
}

export function EventCard({ event, isLiked, onLike }: Props) {
    const category = inferCategoryFromTitle(event.title);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute top-4 left-4">
                    <span className={`${category.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg`}>
                        <span className="mr-1">{category.icon}</span>{category.name}
                    </span>
                </div>
                {isLiked && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">❤️ Favori</span>
                    </div>
                )}
                <div className="absolute bottom-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {event.priceType === 'free' ? '🎟️ Gratuit' : `💰 ${event.price} €`}
                    </span>
                </div>
                {event.priority === "1" && (
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">⭐ Prioritaire</span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h2>
                <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                            {event.city}
                            {event.address && <span className="block text-xs text-gray-400">{event.address}</span>}
                        </span>
                    </div>
                    {event.speakers && event.speakers.length > 0 && (
                        <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{event.speakers.join(', ')}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onLike(event.id)}
                            className={`p-2 rounded-full transition-all ${isLiked ? 'text-red-500 hover:text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>

                        <Link to={`/event/${event.id}/details`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                            <Info className="w-5 h-5" />
                        </Link>
                    </div>

                    <Link to={`/event/${event.id}`} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                        Voir
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}