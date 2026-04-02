import Footer from "../../shared/ui/footer/Footer";
import { Calendar, Users, MapPin, Award, Heart, Globe } from "lucide-react";

export function AboutPage() {

    const features = [
        {
            icon: Calendar,
            title: "Événements variés",
            description: "Découvrez une large gamme d'événements adaptés à tous les goûts et intérêts."
        },
        {
            icon: Users,
            title: "Communauté active",
            description: "Rejoignez une communauté passionnée et connectez-vous avec d'autres participants."
        },
        {
            icon: MapPin,
            title: "Localisation précise",
            description: "Trouvez facilement des événements près de chez vous avec notre système de géolocalisation."
        },
        {
            icon: Award,
            title: "Qualité garantie",
            description: "Tous nos événements sont vérifiés pour garantir une expérience exceptionnelle."
        },
        {
            icon: Heart,
            title: "Service client",
            description: "Notre équipe est disponible pour vous accompagner et répondre à toutes vos questions."
        },
        {
            icon: Globe,
            title: "Multilingue",
            description: "Profitez de notre plateforme en français, anglais et russe."
        }
    ];

    const stats = [
        { number: "1000+", label: "Événements" },
        { number: "50+", label: "Villes" },
        { number: "10K+", label: "Utilisateurs" },
        { number: "99%", label: "Satisfaction" }
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-[#f5c518]/20 p-6 rounded-full">
                            <Heart className="w-16 h-16 text-[#f5c518]" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        À propos d'Eventra
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Votre plateforme de référence pour découvrir et participer aux meilleurs événements près de chez vous. 
                        Nous connectons les organisateurs passionnés avec des participants enthousiastes pour créer des expériences inoubliables.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative bg-gradient-to-r from-[#f5c518]/10 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-[#f5c518] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300 text-lg">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Pourquoi choisir Eventra ?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Nous nous engageons à offrir la meilleure expérience possible pour les organisateurs et les participants.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#f5c518]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
                                <div className="bg-[#f5c518]/20 p-4 rounded-xl w-fit mb-6">
                                    <feature.icon className="w-8 h-8 text-[#f5c518]" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-[#f5c518]/10" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Notre mission
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            Rendre chaque événement accessible, mémorable et significatif. Nous croyons au pouvoir des rencontres 
                            humaines et à la capacité des événements à transformer des vies, créer des liens et inspirer le changement.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="flex items-center gap-2 text-[#f5c518]">
                                <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                <span className="text-white">Innovation</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#f5c518]">
                                <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                <span className="text-white">Communauté</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#f5c518]">
                                <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                <span className="text-white">Excellence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Prêt à rejoindre l'aventure ?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Que vous soyez organisateur ou participant, Eventra est la plateforme qu'il vous faut.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#f5c518] to-[#f5c518]/80 text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                            Créer un événement
                        </button>
                        <button className="px-8 py-4 bg-gradient-to-r from-[#f5c518]/20 to-transparent border border-[#f5c518]/30 text-[#f5c518] font-semibold rounded-xl hover:bg-[#f5c518]/30 transition-all duration-300">
                            Explorer les événements
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
}
