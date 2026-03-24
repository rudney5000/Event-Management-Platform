import { useTranslation } from 'react-i18next';
import type { EventFull } from '../../../../pages/admin/AdminEventPreviewPage';
import { useGetCitiesQuery } from "../../../../entities/city/api/cityApi";

export type TabId = 'details' | 'speakers' | 'location' | 'reviews'

interface EventTabsProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  event: EventFull;
}

export function EventTabs({ event, activeTab, setActiveTab }: EventTabsProps) {
  const { t } = useTranslation();
  const { data: cities } = useGetCitiesQuery();
  const city = cities?.find(c => c.id === event.cityId);
  const tabs: { id: TabId; label: string }[] = [
    { id: 'details',  label: t('eventTabs.details')  },
    { id: 'speakers', label: t('eventTabs.speakers') },
    { id: 'location', label: t('eventTabs.location') },
    { id: 'reviews',  label: t('eventTabs.reviews')  },
  ];

  return (
    <div>
      <nav className="border-b border-gray-200 mb-6 flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="bg-white rounded-xl shadow-md p-6">
        {activeTab === 'details' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {t('eventTabs.aboutEvent')}
            </h3>
            <p>{event.description}</p>
          </div>
        )}

        {activeTab === 'speakers' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {t('eventTabs.speakers')}
            </h3>
            {event.speakers && event.speakers.length > 0
              ? event.speakers.map((s, i) => <p key={i}>{s}</p>)
              : <p className="text-gray-400">{t('eventTabs.noSpeakers')}</p>
            }
          </div>
        )}

        {activeTab === 'location' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {t('eventTabs.location')}
            </h3>
            <p>{event.address}, {city?.name || 'Ville inconnue'}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {t('eventTabs.reviews')}
            </h3>
            <p className="text-gray-400">{t('eventTabs.noReviews')}</p>
          </div>
        )}
      </div>
    </div>
  );
}