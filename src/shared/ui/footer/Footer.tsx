import { ChefHat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-white/10 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#f5c518] rounded-lg flex items-center justify-center">
                            <ChefHat className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-serif font-bold text-lg text-white">
                            Event management platform
                        </span>
                    </div>
                    <p className="text-sm text-gray-400">
                        {t('footer.poweredBy')}{' '}
                        <a
                            href="https://www.themealdb.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f5c518] hover:text-[#f5c518]/80 transition-colors"
                        >
                            TheDedyTech
                        </a>
                    </p>
                    <p className="text-sm text-gray-500">
                        {t('footer.rights', { year: new Date().getFullYear() })}
                    </p>
                </div>
            </div>
        </footer>
    );
}