import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Footer from "../../shared/ui/footer/Footer.tsx";

export function ContactPage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#f5c518]/20 p-4 rounded-full">
                            <Mail className="w-12 h-12 text-[#f5c518]" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('contactPage.title')}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {t('contactPage.subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <Send className="w-6 h-6 text-[#f5c518]" />
                            {t('contactPage.form.title')}
                        </h2>
                        
                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg">
                                <p className="text-green-300">{t('contactPage.form.success')}</p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
                                <p className="text-red-300">{t('contactPage.form.error')}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contactPage.form.name')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all"
                                    placeholder={t('contactPage.form.name')}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contactPage.form.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all"
                                    placeholder={t('contactPage.form.email')}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contactPage.form.subject')}
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all"
                                    placeholder={t('contactPage.form.subject')}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contactPage.form.message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all resize-none"
                                    placeholder={t('contactPage.form.message')}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#f5c518] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#f5c518]/90 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        {t('contactPage.form.submitting')}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        {t('contactPage.form.submit')}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Quick Info */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                <Mail className="w-6 h-6 text-[#f5c518]" />
                                {t('contactPage.info.title')}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f5c518]/20 p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-[#f5c518]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{t('contactPage.info.email.title')}</p>
                                        <p className="text-gray-400">{t('contactPage.info.email.value')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f5c518]/20 p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-[#f5c518]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{t('contactPage.info.phone.title')}</p>
                                        <p className="text-gray-400">{t('contactPage.info.phone.value')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#f5c518]/20 p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-[#f5c518]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{t('contactPage.info.address.title')}</p>
                                        <p className="text-gray-400">{t('contactPage.info.address.value')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-[#f5c518]" />
                                {t('contactPage.hours.title')}
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">{t('contactPage.hours.monday')}</span>
                                    <span className="text-[#f5c518]">9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">{t('contactPage.hours.tuesday')}</span>
                                    <span className="text-[#f5c518]">9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">{t('contactPage.hours.wednesday')}</span>
                                    <span className="text-[#f5c518]">9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">{t('contactPage.hours.thursday')}</span>
                                    <span className="text-[#f5c518]">9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">{t('contactPage.hours.friday')}</span>
                                    <span className="text-[#f5c518]">9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">{t('contactPage.hours.weekend')}</span>
                                    <span className="text-red-400">{t('contactPage.hours.weekendHours')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6">
                                {t('contactPage.social.title')}
                            </h3>
                            <div className="flex space-x-4">
                                <a href="#" className="bg-[#f5c518]/20 p-3 rounded-lg hover:bg-[#f5c518]/30 transition-colors">
                                    <Facebook className="w-6 h-6 text-[#f5c518]" />
                                </a>
                                <a href="#" className="bg-[#f5c518]/20 p-3 rounded-lg hover:bg-[#f5c518]/30 transition-colors">
                                    <Twitter className="w-6 h-6 text-[#f5c518]" />
                                </a>
                                <a href="#" className="bg-[#f5c518]/20 p-3 rounded-lg hover:bg-[#f5c518]/30 transition-colors">
                                    <Instagram className="w-6 h-6 text-[#f5c518]" />
                                </a>
                                <a href="#" className="bg-[#f5c518]/20 p-3 rounded-lg hover:bg-[#f5c518]/30 transition-colors">
                                    <Linkedin className="w-6 h-6 text-[#f5c518]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
