import type { ChangeEvent } from 'react';
import { getTranslatedCategories } from '../../entities/event/constants';
import { Filter, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
    selectedCategories: string[];
    toggleCategory: (id: string) => void;
    priceFilter: 'all' | 'free' | 'paid';
    setPriceFilter: (val: 'all' | 'free' | 'paid') => void;
    cityFilter: string;
    setCityFilter: (val: string) => void;
    uniqueCities: string[];
    sortBy: 'date' | 'price' | 'title';
    setSortBy: (val: 'date' | 'price' | 'title') => void;
    resetFilters: () => void;
    showFilters: boolean;
    setShowFilters: (val: boolean) => void;
}

export function EventFilters(props: Props) {
    const { t } = useTranslation();
    const {
        selectedCategories,
        toggleCategory,
        priceFilter,
        setPriceFilter,
        cityFilter,
        setCityFilter,
        uniqueCities,
        sortBy,
        setSortBy,
        resetFilters,
        showFilters,
        setShowFilters
    } = props;

    return (
        <div className="mb-8">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
            >
                <Filter className="w-4 h-4 text-[#f5c518]" />
                <span>{t('filters.filters')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">{t('filters.title')}</h2>
                        <button
                            onClick={resetFilters}
                            className="text-sm text-[#f5c518] hover:text-[#f5c518]/80 transition-colors"
                        >
                            {t('filters.reset')}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                {t('filters.categories')}
                            </label>
                            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                {getTranslatedCategories(t).map(cat => (
                                    <label key={cat.id} className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.id)}
                                            onChange={() => toggleCategory(cat.id)}
                                            className="rounded border-white/20 bg-white/5 text-[#f5c518] focus:ring-[#f5c518] focus:ring-offset-0"
                                        />
                                        <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors flex items-center">
                                            <span className={`w-2 h-2 rounded-full ${cat.color} mr-2`}></span>
                                            {cat.icon} {cat.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                {t('filters.price')}
                            </label>
                            <select
                                value={priceFilter}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setPriceFilter(e.target.value as 'all' | 'free' | 'paid')
                                }
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#f5c518] transition-colors"
                            >
                                <option value="all">{t('filters.allPrices')}</option>
                                <option value="free">{t('filters.free')}</option>
                                <option value="paid">{t('filters.paid')}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                {t('filters.city')}
                            </label>
                            <select
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#f5c518] transition-colors"
                            >
                                <option value="">{t('filters.allCities')}</option>
                                {uniqueCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                {t('filters.sortBy')}
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'title')}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#f5c518] transition-colors"
                            >
                                <option value="date">{t('filters.sortDate')}</option>
                                <option value="price">{t('filters.sortPrice')}</option>
                                <option value="title">{t('filters.sortTitle')}</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}