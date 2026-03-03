import type { ChangeEvent } from 'react';
import { CATEGORIES } from '../../entities/event/constants';
import { X, Filter, ChevronDown } from 'lucide-react';

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
    const {
        selectedCategories, toggleCategory, priceFilter, setPriceFilter,
        cityFilter, setCityFilter, uniqueCities, sortBy, setSortBy,
        resetFilters, showFilters, setShowFilters
    } = props;

    return (
        <div className="mb-8">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 mb-4"
            >
                <Filter className="w-4 h-4" />
                Filtres
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {showFilters && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg">Filtres</h2>
                        <button onClick={resetFilters} className="text-sm text-indigo-600 hover:text-indigo-800">Réinitialiser</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {CATEGORIES.map(cat => (
                                    <label key={cat.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.id)}
                                            onChange={() => toggleCategory(cat.id)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-sm flex items-center">
                                            <span className={`w-2 h-2 rounded-full ${cat.color} mr-2`}></span>
                                            {cat.icon} {cat.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prix</label>
                            <select
                                value={priceFilter}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setPriceFilter(e.target.value as any)}
                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="all">Tous les prix</option>
                                <option value="free">Gratuit</option>
                                <option value="paid">Payant</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                            <select
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Toutes les villes</option>
                                {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="date">Date</option>
                                <option value="price">Prix</option>
                                <option value="title">Titre</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}