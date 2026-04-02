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
                className="group relative overflow-hidden bg-gradient-to-r from-[#f5c518]/20 to-[#f5c518]/10 border border-[#f5c518]/30 rounded-xl px-6 py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,197,24,0.3)]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f5c518]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                    <Filter className="w-5 h-5 text-[#f5c518]" />
                    <span className="text-white font-medium">{t('filters.filters')}</span>
                    <ChevronDown className={`w-4 h-4 text-[#f5c518] transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {showFilters && (
                <div className="mt-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-[#f5c518]/10 rounded-2xl blur-xl" />
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#f5c518]/20 p-2 rounded-lg">
                                    <Filter className="w-5 h-5 text-[#f5c518]" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">{t('filters.title')}</h2>
                            </div>
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-gradient-to-r from-[#f5c518]/20 to-transparent border border-[#f5c518]/30 rounded-lg text-[#f5c518] hover:bg-[#f5c518]/30 transition-all duration-300 text-sm font-medium"
                            >
                                {t('filters.reset')}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                    {t('filters.categories')}
                                </label>
                                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {getTranslatedCategories(t).map(cat => (
                                        <label key={cat.id} className="group flex items-center cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat.id)}
                                                onChange={() => toggleCategory(cat.id)}
                                                className="rounded border-white/20 bg-white/10 text-[#f5c518] focus:ring-[#f5c518] focus:ring-offset-0 focus:ring-offset-black"
                                            />
                                            <span className="ml-3 text-sm text-gray-300 group-hover:text-white transition-colors flex items-center">
                                                <span className={`w-2 h-2 rounded-full ${cat.color} mr-2`}></span>
                                                <span className="mr-2">{cat.icon}</span>
                                                {cat.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                    {t('filters.price')}
                                </label>
                                <select
                                    value={priceFilter}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                        setPriceFilter(e.target.value as 'all' | 'free' | 'paid')
                                    }
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#f5c518] focus:ring-1 focus:ring-[#f5c518] transition-all duration-300"
                                >
                                    <option value="all" className="bg-black">{t('filters.allPrices')}</option>
                                    <option value="free" className="bg-black">{t('filters.free')}</option>
                                    <option value="paid" className="bg-black">{t('filters.paid')}</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                    {t('filters.city')}
                                </label>
                                <select
                                    value={cityFilter}
                                    onChange={(e) => setCityFilter(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#f5c518] focus:ring-1 focus:ring-[#f5c518] transition-all duration-300"
                                >
                                    <option value="" className="bg-black">{t('filters.allCities')}</option>
                                    {uniqueCities.map(city => (
                                        <option key={city} value={city} className="bg-black">{city}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <div className="w-2 h-2 bg-[#f5c518] rounded-full" />
                                    {t('filters.sortBy')}
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'title')}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#f5c518] focus:ring-1 focus:ring-[#f5c518] transition-all duration-300"
                                >
                                    <option value="date" className="bg-black">{t('filters.sortDate')}</option>
                                    <option value="price" className="bg-black">{t('filters.sortPrice')}</option>
                                    <option value="title" className="bg-black">{t('filters.sortTitle')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}