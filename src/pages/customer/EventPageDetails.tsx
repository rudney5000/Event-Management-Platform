import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { 
    Calendar, MapPin, Heart, Users, Euro, Tag, 
    Clock, Share2, ArrowLeft, Globe, Mail, Phone,
    ChevronLeft, ChevronRight, Star
} from "lucide-react";
import { useGetEventByIdQuery } from "../../entities/event/api/eventsApi";

// Types pour les catégories (simulées)
const CATEGORIES = [
    { id: 'conf', name: 'Conférence', color: 'bg-blue-500', icon: '🎤' },
    { id: 'workshop', name: 'Atelier', color: 'bg-green-500', icon: '🔧' },
    { id: 'seminar', name: 'Séminaire', color: 'bg-purple-500', icon: '📊' },
    { id: 'networking', name: 'Networking', color: 'bg-yellow-500', icon: '🤝' },
    { id: 'concert', name: 'Concert', color: 'bg-red-500', icon: '🎵' },
    { id: 'exhibition', name: 'Exposition', color: 'bg-indigo-500', icon: '🎨' },
    { id: 'sport', name: 'Sportif', color: 'bg-orange-500', icon: '⚽' },
    { id: 'other', name: 'Autre', color: 'bg-gray-500', icon: '📌' }
];

// Fonction pour déterminer la catégorie
const inferCategoryFromTitle = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('conf') || titleLower.includes('keynote')) return CATEGORIES[0];
    if (titleLower.includes('atelier') || titleLower.includes('workshop')) return CATEGORIES[1];
    if (titleLower.includes('séminaire') || titleLower.includes('seminar')) return CATEGORIES[2];
    if (titleLower.includes('networking') || titleLower.includes('réseau')) return CATEGORIES[3];
    if (titleLower.includes('concert') || titleLower.includes('festival')) return CATEGORIES[4];
    if (titleLower.includes('expo') || titleLower.includes('exhibition')) return CATEGORIES[5];
    if (titleLower.includes('sport') || titleLower.includes('tournoi')) return CATEGORIES[6];
    return CATEGORIES[7];
};

export function EventPageDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading, error } = useGetEventByIdQuery(id!);
    const [isLiked, setIsLiked] = useState(false);
    const [activeTab, setActiveTab] = useState<'details' | 'speakers' | 'location' | 'reviews'>('details');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Vérifier si l'événement est dans les favoris
    useEffect(() => {
        const savedLikes = localStorage.getItem('likedEvents');
        if (savedLikes && event) {
            const likes = JSON.parse(savedLikes);
            setIsLiked(likes.includes(event.id));
        }
    }, [event]);

    const handleLike = () => {
        if (!event) return;
        
        const savedLikes = localStorage.getItem('likedEvents');
        let likes: string[] = savedLikes ? JSON.parse(savedLikes) : [];
        
        if (isLiked) {
            likes = likes.filter(id => id !== event.id);
        } else {
            likes.push(event.id);
        }
        
        localStorage.setItem('likedEvents', JSON.stringify(likes));
        setIsLiked(!isLiked);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event?.title,
                    text: `Découvrez cet événement : ${event?.title}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Erreur de partage', error);
            }
        } else {
            // Fallback : copier le lien
            navigator.clipboard.writeText(window.location.href);
            alert('Lien copié dans le presse-papiers !');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement de l'événement...</p>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
                    <div className="text-red-500 text-5xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Événement non trouvé</h2>
                    <p className="text-gray-600 mb-6">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
                    <Link 
                        to="/events"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour aux événements
                    </Link>
                </div>
            </div>
        );
    }

    const category = inferCategoryFromTitle(event.title);

    // Images simulées (à remplacer par de vraies images de votre backend)
    const images = [
        `https://source.unsplash.com/random/1200x600/?event,${event.title}`,
        `https://source.unsplash.com/random/1200x600/?conference`,
        `https://source.unsplash.com/random/1200x600/?audience`,
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            to="/events"
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Retour aux événements
                        </Link>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleShare}
                                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                aria-label="Partager"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleLike}
                                className={`p-2 rounded-full transition-colors ${
                                    isLiked 
                                        ? 'text-red-500 hover:text-red-600 bg-red-50' 
                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                }`}
                                aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Galerie d'images */}
                <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-900 aspect-[21/9]">
                    <img 
                        src={images[currentImageIndex]} 
                        alt={event.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                    
                    {/* Navigation des images */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setCurrentImageIndex(prev => (prev + 1) % images.length)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                            
                            {/* Indicateurs d'images */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === currentImageIndex 
                                                ? 'bg-white w-4' 
                                                : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Badge catégorie */}
                    <div className="absolute top-4 left-4">
                        <span className={`${category.color} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg`}>
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </span>
                    </div>

                    {/* Badge priorité */}
                    {event.priority === "1" && (
                        <div className="absolute top-4 right-4">
                            <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                                <Star className="w-4 h-4 mr-2 fill-current" />
                                Événement prioritaire
                            </span>
                        </div>
                    )}
                </div>

                {/* En-tête de l'événement */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {event.title}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Date */}
                        <div className="flex items-start">
                            <Calendar className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium">
                                    {new Date(event.date).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {new Date(event.date).toLocaleTimeString('fr-FR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Lieu */}
                        <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Lieu</p>
                                <p className="font-medium">{event.city}</p>
                                {event.address && (
                                    <p className="text-sm text-gray-600">{event.address}</p>
                                )}
                            </div>
                        </div>

                        {/* Prix */}
                        <div className="flex items-start">
                            <Euro className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Prix</p>
                                <p className="font-medium">
                                    {event.priceType === 'free' 
                                        ? 'Gratuit' 
                                        : `${event.price} €`}
                                </p>
                                {event.priceType === 'paid' && (
                                    <p className="text-sm text-gray-600">TTC</p>
                                )}
                            </div>
                        </div>

                        {/* Statut */}
                        <div className="flex items-start">
                            <Tag className="w-5 h-5 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500">Statut</p>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                    event.status === 'published' 
                                        ? 'bg-green-100 text-green-800'
                                        : event.status === 'draft'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {event.status === 'published' ? 'Publié' : 
                                     event.status === 'draft' ? 'Annulé' : 
                                     event.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs de navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'details', label: 'Détails' },
                            { id: 'speakers', label: 'Intervenants' },
                            { id: 'location', label: 'Localisation' },
                            { id: 'reviews', label: 'Avis' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Contenu des tabs */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    {/* Tab Détails */}
                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            {/* Description (simulée) */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">À propos de l'événement</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Rejoignez-nous pour cet événement exceptionnel {event.title}. 
                                    Une opportunité unique de découvrir les dernières tendances et 
                                    d'échanger avec des experts du domaine. {event.speakers?.length > 0 && 
                                        `Nos intervenants ${event.speakers.join(' et ')} vous feront 
                                        partager leur expertise à travers des sessions interactives et inspirantes.`}
                                </p>
                            </div>

                            {/* Tags */}
                            {event.tags && event.tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.tags.map(tag => (
                                            <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Informations complémentaires */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Organisateur</h4>
                                    <p className="text-gray-600">Équipe {event.title}</p>
                                    <p className="text-sm text-gray-500 mt-1">contact@{event.title.toLowerCase().replace(/\s+/g, '')}.com</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Capacité</h4>
                                    <p className="text-gray-600">Places disponibles : 50 / 100</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Intervenants */}
                    {activeTab === 'speakers' && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Intervenants</h3>
                            {event.speakers && event.speakers.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {event.speakers.map((speaker, index) => (
                                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                {speaker.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{speaker}</h4>
                                                <p className="text-sm text-gray-600">Intervenant principal</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    Expert dans le domaine avec plus de 10 ans d'expérience.
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Aucun intervenant annoncé pour le moment</p>
                            )}
                        </div>
                    )}

                    {/* Tab Localisation */}
                    {activeTab === 'location' && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Comment venir ?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                        <h4 className="font-medium mb-2 flex items-center">
                                            <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                                            Adresse
                                        </h4>
                                        <p className="text-gray-600">{event.address}</p>
                                        <p className="text-gray-600">{event.city}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">Accès</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>🚇 Métro : Ligne 1, station "République"</li>
                                            <li>🚌 Bus : Lignes 20, 65, 75</li>
                                            <li>🚗 Parking : Parking Indigo à 5min</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                {/* Carte simulée */}
                                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                                    <p className="text-gray-500">Carte interactive</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Avis */}
                    {activeTab === 'reviews' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold">Avis des participants</h3>
                                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                    Donner mon avis
                                </button>
                            </div>

                            {/* Avis simulés */}
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, index) => (
                                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                                        <div className="flex items-center mb-2">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                                            <div>
                                                <p className="font-medium">Participant {index + 1}</p>
                                                <div className="flex items-center">
                                                    {[1,2,3,4,5].map(star => (
                                                        <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Super événement ! Très bien organisé et des intervenants passionnants.
                                            Je recommande vivement.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Section d'action (réserver) */}
                <div className="mt-8 bg-white rounded-xl shadow-md p-6 border-2 border-indigo-100">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Prêt à participer ?
                            </h3>
                            <p className="text-gray-600">
                                {event.priceType === 'free' 
                                    ? 'Inscrivez-vous gratuitement dès maintenant' 
                                    : `Réservez votre place pour ${event.price} €`}
                            </p>
                        </div>
                        <button className="mt-4 md:mt-0 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
                            {event.priceType === 'free' ? "S'inscrire gratuitement" : 'Réserver ma place'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}