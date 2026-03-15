import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'RU', name: 'Русский', flag: '🇷🇺' }
];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[1];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-1 text-sm/6 font-semibold text-white hover:text-gray-300 transition-colors"
        aria-label={t('header.language')}
      >
        <Languages className="w-4 h-4 mr-1" />
        <span className="uppercase">{currentLanguage.code}</span>
        <ChevronDownIcon 
          aria-hidden="true" 
          className={`size-4 flex-none text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 mt-2 z-50 w-40 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/5 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2
                  ${currentLanguage.code === lang.code 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <span>{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                {currentLanguage.code === lang.code && (
                  <span className="text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}