import i18n from "../../../shared/config/i18n/i18n";
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const languages = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Russian' }
];

export function LanguageSwitcher() {
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
      >
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
          
          <div className="absolute right-0 mt-2 z-50 w-32 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/5 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full px-4 py-2 text-left text-sm transition-colors
                  ${currentLanguage.code === lang.code 
                    ? 'bg-indigo-600 text-white font-semibold' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <span className="uppercase mr-2">{lang.label}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}