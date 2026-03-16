import { ChefHat } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function Footer() {

    const { t } = useTranslation();

    return (
        <footer className="bg-indigo-500 rounded-xl text-secondary-content mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <ChefHat className="w-4 h-4 text-primary-content" />
                        </div>
                        <span className="font-serif font-bold text-lg">Event management platform</span>
                    </div>
                    <p className="text-sm text-secondary-content/60">
                        {t('footer.poweredBy')}{' '}
                        <a
                            href="https://www.themealdb.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 hover:text-primary transition-colors"
                        >
                            TheDedyTech
                        </a>
                    </p>
                    <p className="text-sm text-secondary-content/40">
                        {t('footer.rights', { year: new Date().getFullYear() })}
                    </p>
                </div>
            </div>
        </footer>
    )
}