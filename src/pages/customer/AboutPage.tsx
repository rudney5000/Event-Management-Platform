import { useTranslation } from "react-i18next";
import Footer from "../../shared/ui/footer/Footer";
import { Calendar, Users, MapPin, Award, Heart, Globe } from "lucide-react";

export function AboutPage() {
    const { t } = useTranslation();

    const features = [
        {
            icon: Calendar,
            title: t('aboutPage.features.variedEvents.title'),
            description: t('aboutPage.features.variedEvents.description')
        },
        {
            icon: Users,
            title: t('aboutPage.features.activeCommunity.title'),
            description: t('aboutPage.features.activeCommunity.description')
        },
        {
            icon: MapPin,
            title: t('aboutPage.features.preciseLocation.title'),
            description: t('aboutPage.features.preciseLocation.description')
        },
        {
            icon: Award,
            title: t('aboutPage.features.qualityGuaranteed.title'),
            description: t('aboutPage.features.qualityGuaranteed.description')
        },
        {
            icon: Heart,
            title: t('aboutPage.features.customerService.title'),
            description: t('aboutPage.features.customerService.description')
        },
        {
            icon: Globe,
            title: t('aboutPage.features.multilingual.title'),
            description: t('aboutPage.features.multilingual.description')
        }
    ];

    const stats = [
        { number: "1000+", label: t('aboutPage.stats.events') },
        { number: "50+", label: t('aboutPage.stats.cities') },
        { number: "10K+", label: t('aboutPage.stats.users') },
        { number: "99%", label: t('aboutPage.stats.satisfaction') }
    ];

    return (
        <div className="min-h-screen bg-black">
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-[#f5c518]/20 p-6 rounded-full">
                            <Heart className="w-16 h-16 text-[#f5c518]" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        {t('aboutPage.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {t('aboutPage.subtitle')}
                    </p>
                </div>
            </div>

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        {t('aboutPage.whyChooseUs')}
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {t('aboutPage.whyChooseUsDesc')}
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

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-[#f5c518]/10" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {t('aboutPage.mission')}
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            {t('aboutPage.missionDesc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="flex items-center gap-2 text-[#f5c518]">
                                <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                <span className="text-white">{t('aboutPage.values.innovation')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#f5c518]">
                                <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                <span className="text-white">{t('aboutPage.values.community')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#f5c518]">
                                <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                <span className="text-white">{t('aboutPage.values.excellence')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {t('aboutPage.readyToJoin')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        {t('aboutPage.readyToJoinDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#f5c518] to-[#f5c518]/80 text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                            {t('aboutPage.createEvent')}
                        </button>
                        <button className="px-8 py-4 bg-gradient-to-r from-[#f5c518]/20 to-transparent border border-[#f5c518]/30 text-[#f5c518] font-semibold rounded-xl hover:bg-[#f5c518]/30 transition-all duration-300">
                            {t('aboutPage.exploreEvents')}
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
