import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export function SearchBar({ value, onChange, className = '' }: SearchBarProps) {
    const { t } = useTranslation();

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2.5 pl-10 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c518] focus:ring-1 focus:ring-[#f5c518] transition-all"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        </div>
    );
}