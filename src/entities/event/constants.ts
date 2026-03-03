import type { Category } from "../category/model/types";

export const CATEGORIES: Category[] = [
    { id: 'conf', name: 'Conférence', color: 'bg-blue-500', icon: '🎤' },
    { id: 'workshop', name: 'Atelier', color: 'bg-green-500', icon: '🔧' },
    { id: 'seminar', name: 'Séminaire', color: 'bg-purple-500', icon: '📊' },
    { id: 'networking', name: 'Networking', color: 'bg-yellow-500', icon: '🤝' },
    { id: 'concert', name: 'Concert', color: 'bg-red-500', icon: '🎵' },
    { id: 'exhibition', name: 'Exposition', color: 'bg-indigo-500', icon: '🎨' },
    { id: 'sport', name: 'Sportif', color: 'bg-orange-500', icon: '⚽' },
    { id: 'other', name: 'Autre', color: 'bg-gray-500', icon: '📌' },
];

export const inferCategoryFromTitle = (title: string): Category => {
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