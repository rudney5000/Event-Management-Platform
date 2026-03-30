import { useTranslation } from 'react-i18next';
import type { EventFull } from '../../../../pages/admin/AdminEventPreviewPage';
import { Info, MapPin, MessageSquare, User } from 'lucide-react';
import { DetailsTab } from './DetailsTab';
import { SpeakersTab } from './SpeakersTab';
import { LocationTab } from './LocationTab';
import { ReviewsTab } from './ReviewsTab';

export type TabId = 'details' | 'speakers' | 'location' | 'reviews'

interface EventTabsProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  event: EventFull;
}

export function EventTabs({ event, activeTab, setActiveTab }: EventTabsProps) {
  const { t } = useTranslation();

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'details',  label: t('eventTabs.details'),  icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'speakers', label: t('eventTabs.speakers'), icon: <User className="w-3.5 h-3.5" /> },
    { id: 'location', label: t('eventTabs.location'), icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'reviews',  label: t('eventTabs.reviews'),  icon: <MessageSquare className="w-3.5 h-3.5" /> },
  ];

  return (
    <div>
      <nav className="flex gap-1 mb-6 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#f5c518] text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-white/20'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
 
      <div className="text-sm text-gray-300 leading-relaxed">
        {activeTab === 'details' && <DetailsTab event={event} t={t} />}
        {activeTab === 'speakers' && <SpeakersTab event={event} t={t} />}
        {activeTab === 'location' && <LocationTab event={event} t={t} />}
        {activeTab === 'reviews' && <ReviewsTab t={t} />}
      </div>
    </div>
  );
}