import { Link } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { useGetEventsQuery } from "../../entities/event/api/eventsApi";
import { 
    Calendar, MapPin, Heart, Info, ExternalLink, 
    Tag, Users, Euro, Filter, X, Search,
    ChevronDown
} from "lucide-react";

// Types pour les catégories
interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
}

// Catégories simulées (à remplacer par vos données backend)
const CATEGORIES: Category[] = [
    { id: 'conf', name: 'Conférence', color: 'bg-blue-500', icon: '🎤' },
    { id: 'workshop', name: 'Atelier', color: 'bg-green-500', icon: '🔧' },
    { id: 'seminar', name: 'Séminaire', color: 'bg-purple-500', icon: '📊' },
    { id: 'networking', name: 'Networking', color: 'bg-yellow-500', icon: '🤝' },
    { id: 'concert', name: 'Concert', color: 'bg-red-500', icon: '🎵' },
    { id: 'exhibition', name: 'Exposition', color: 'bg-indigo-500', icon: '🎨' },
    { id: 'sport', name: 'Sportif', color: 'bg-orange-500', icon: '⚽' },
    { id: 'other', name: 'Autre', color: 'bg-gray-500', icon: '📌' }
];

// Fonction pour déterminer la catégorie basée sur le titre (simulation)
const inferCategoryFromTitle = (title: string): Category => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('conf') || titleLower.includes('keynote')) return CATEGORIES[0];
    if (titleLower.includes('atelier') || titleLower.includes('workshop')) return CATEGORIES[1];
    if (titleLower.includes('séminaire') || titleLower.includes('seminar')) return CATEGORIES[2];
    if (titleLower.includes('networking') || titleLower.includes('réseau')) return CATEGORIES[3];
    if (titleLower.includes('concert') || titleLower.includes('festival')) return CATEGORIES[4];
    if (titleLower.includes('expo') || titleLower.includes('exhibition')) return CATEGORIES[5];
    if (titleLower.includes('sport') || titleLower.includes('tournoi')) return CATEGORIES[6];
    return CATEGORIES[7]; // Autre par défaut
};

export function EventPage() {
    const { data, isLoading, error } = useGetEventsQuery({ page: 1, limit: 10 });
    const [likedEvents, setLikedEvents] = useState<string[]>([]);
    
    // États pour les filtres
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
    const [cityFilter, setCityFilter] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date');

    // Charger les likes depuis le localStorage
    useEffect(() => {
        const savedLikes = localStorage.getItem('likedEvents');
        if (savedLikes) {
            setLikedEvents(JSON.parse(savedLikes));
        }
    }, []);

    // Sauvegarder les likes
    useEffect(() => {
        localStorage.setItem('likedEvents', JSON.stringify(likedEvents));
    }, [likedEvents]);

    // Extraire toutes les villes uniques pour le filtre
    const uniqueCities = useMemo(() => {
        if (!data?.events) return [];
        const cities = new Set(data.events.map(event => event.city));
        return Array.from(cities).sort();
    }, [data?.events]);

    // Filtrer et trier les événements
    const filteredEvents = useMemo(() => {
        if (!data?.events) return [];

        return data.events
            .filter(event => {
                // Filtre par catégorie
                const eventCategory = inferCategoryFromTitle(event.title);
                if (selectedCategories.length > 0 && !selectedCategories.includes(eventCategory.id)) {
                    return false;
                }

                // Filtre par prix
                if (priceFilter === 'free' && event.priceType !== 'free') return false;
                if (priceFilter === 'paid' && event.priceType !== 'paid') return false;

                // Filtre par ville
                if (cityFilter && event.city !== cityFilter) return false;

                // Recherche textuelle
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    return event.title.toLowerCase().includes(query) ||
                           event.city.toLowerCase().includes(query) ||
                           (event.speakers && event.speakers.some(s => s.toLowerCase().includes(query)));
                }

                return true;
            })
            .sort((a, b) => {
                switch(sortBy) {
                    case 'date':
                        return new Date(a.date).getTime() - new Date(b.date).getTime();
                    case 'price':
                        if (a.priceType === 'free') return -1;
                        if (b.priceType === 'free') return 1;
                        return (a.price || 0) - (b.price || 0);
                    case 'title':
                        return a.title.localeCompare(b.title);
                    default:
                        return 0;
                }
            });
    }, [data?.events, selectedCategories, priceFilter, cityFilter, searchQuery, sortBy]);

    const handleLike = (eventId: string) => {
        setLikedEvents(prev => 
            prev.includes(eventId) 
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceFilter('all');
        setCityFilter('');
        setSearchQuery('');
        setSortBy('date');
    };

    // Reste du code pour les états de chargement et d'erreur (identique à avant)
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des événements...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
                    <p className="text-gray-600">Impossible de charger les événements. Veuillez réessayer plus tard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* En-tête avec recherche */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Événements
                    </h1>
                    
                    {/* Barre de recherche */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un événement, une ville, un speaker..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Bouton pour afficher/masquer les filtres */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 mb-4"
                    >
                        <Filter className="w-4 h-4" />
                        Filtres
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Panneau de filtres */}
                    {showFilters && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-lg">Filtres</h2>
                                <button
                                    onClick={resetFilters}
                                    className="text-sm text-indigo-600 hover:text-indigo-800"
                                >
                                    Réinitialiser
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Filtre par catégorie */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catégories
                                    </label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {CATEGORIES.map(category => (
                                            <label key={category.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.id)}
                                                    onChange={() => toggleCategory(category.id)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm flex items-center">
                                                    <span className={`w-2 h-2 rounded-full ${category.color} mr-2`}></span>
                                                    {category.icon} {category.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Filtre par prix */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prix
                                    </label>
                                    <select
                                        value={priceFilter}
                                        onChange={(e) => setPriceFilter(e.target.value as any)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="all">Tous les prix</option>
                                        <option value="free">Gratuit</option>
                                        <option value="paid">Payant</option>
                                    </select>
                                </div>

                                {/* Filtre par ville */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ville
                                    </label>
                                    <select
                                        value={cityFilter}
                                        onChange={(e) => setCityFilter(e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Toutes les villes</option>
                                        {uniqueCities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tri */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trier par
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="date">Date</option>
                                        <option value="price">Prix</option>
                                        <option value="title">Titre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filtres actifs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedCategories.map(catId => {
                            const cat = CATEGORIES.find(c => c.id === catId);
                            return cat && (
                                <span key={cat.id} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                    {cat.icon} {cat.name}
                                    <X 
                                        className="w-3 h-3 ml-1 cursor-pointer hover:text-indigo-600" 
                                        onClick={() => toggleCategory(cat.id)}
                                    />
                                </span>
                            );
                        })}
                        {priceFilter !== 'all' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                {priceFilter === 'free' ? 'Gratuit' : 'Payant'}
                                <X className="w-3 h-3 ml-1 cursor-pointer hover:text-indigo-600" onClick={() => setPriceFilter('all')} />
                            </span>
                        )}
                        {cityFilter && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                                {cityFilter}
                                <X className="w-3 h-3 ml-1 cursor-pointer hover:text-indigo-600" onClick={() => setCityFilter('')} />
                            </span>
                        )}
                    </div>

                    {/* Résultats */}
                    <p className="text-gray-600 mb-6">
                        {filteredEvents.length} événement(s) trouvé(s)
                    </p>
                </div>

                {/* Grille d'événements */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => {
                        const isLiked = likedEvents.includes(event.id);
                        const category = inferCategoryFromTitle(event.title);
                        
                        return (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                            >
                                {/* En-tête avec catégorie et priorité */}
                                <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                                    <div className="absolute inset-0 bg-black opacity-20"></div>
                                    
                                    {/* Catégorie */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`${category.color} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg`}>
                                            <span className="mr-1">{category.icon}</span>
                                            {category.name}
                                        </span>
                                    </div>

                                    {/* Badge Favori */}
                                    {isLiked && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                                ❤️ Favori
                                            </span>
                                        </div>
                                    )}

                                    {/* Prix */}
                                    <div className="absolute bottom-4 right-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                            {event.priceType === 'free' ? '🎟️ Gratuit' : `💰 ${event.price} €`}
                                        </span>
                                    </div>

                                    {/* Priorité */}
                                    {event.priority === "1" && (
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">
                                                ⭐ Prioritaire
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Contenu (similaire à avant) */}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {event.title}
                                    </h2>
                                    
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                            <span className="text-sm">
                                                {new Date(event.date).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
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
                                                <span className="text-sm">
                                                    {event.speakers.join(', ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleLike(event.id)}
                                                className={`p-2 rounded-full transition-all ${
                                                    isLiked 
                                                        ? 'text-red-500 hover:text-red-600 bg-red-50' 
                                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                                }`}
                                            >
                                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                            </button>

                                            <Link
                                                to={`/event/${event.id}/details`}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                                            >
                                                <Info className="w-5 h-5" />
                                            </Link>
                                        </div>

                                        <Link
                                            to={`/event/${event.id}`}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Voir
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Message si aucun résultat */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg mb-2">Aucun événement trouvé</p>
                        <p className="text-gray-400">Essayez de modifier vos filtres</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}