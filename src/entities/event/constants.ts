import type { Category } from "../category";

export const CATEGORIES: Category[] = [
    { id: 'conf', name: 'conference', color: 'bg-blue-500', icon: '🎤' },
    { id: 'workshop', name: 'workshop', color: 'bg-green-500', icon: '🔧' },
    { id: 'seminar', name: 'seminar', color: 'bg-purple-500', icon: '📊' },
    { id: 'networking', name: 'networking', color: 'bg-yellow-500', icon: '🤝' },
    { id: 'concert', name: 'concert', color: 'bg-red-500', icon: '🎵' },
    { id: 'exhibition', name: 'exhibition', color: 'bg-indigo-500', icon: '🎨' },
    { id: 'sport', name: 'sport', color: 'bg-orange-500', icon: '⚽' },
    { id: 'other', name: 'other', color: 'bg-gray-500', icon: '📌' },
];

export const getTranslatedCategories = (t: (key: string) => string): Category[] => {
    return CATEGORIES.map(category => ({
        ...category,
        name: t(`eventCategories.${category.name}`)
    }));
};

export const inferCategoryFromTitle = (title: string | undefined): Category => {
    if (!title) return CATEGORIES[7];
    const t = title.toLowerCase();
    if (t.includes('conf') || t.includes('keynote')) return CATEGORIES[0];
    if (t.includes('atelier') || t.includes('workshop')) return CATEGORIES[1];
    if (t.includes('séminaire') || t.includes('seminar')) return CATEGORIES[2];
    if (t.includes('networking') || t.includes('réseau')) return CATEGORIES[3];
    if (t.includes('concert') || t.includes('festival')) return CATEGORIES[4];
    if (t.includes('expo') || t.includes('exhibition')) return CATEGORIES[5];
    if (t.includes('sport') || t.includes('tournoi')) return CATEGORIES[6];
    return CATEGORIES[7];
};