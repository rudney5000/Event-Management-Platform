import type { EventFull } from "../../pages/admin/AdminEventPreviewPage";

export type TabId = 'details' | 'speakers' | 'location' | 'reviews'

interface EventTabsProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  event: EventFull;
}

export function EventTabs({ event, activeTab, setActiveTab }: EventTabsProps) {
  const tabs: { id: TabId; label: string}[] = [
    { id: 'details', label: 'Détails' },
    { id: 'speakers', label: 'Intervenants' },
    { id: 'location', label: 'Localisation' },
    { id: 'reviews', label: 'Avis' }
  ];

  return (
    <div>
      <nav className="border-b border-gray-200 mb-6 flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
            <h3 className="text-lg font-semibold mb-3">À propos de l'événement</h3>
            <p>{event.description}</p>
          </div>
        )}

        {activeTab === 'speakers' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Intervenants</h3>
            {event.speakers?.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>
        )}

        {activeTab === 'location' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Localisation</h3>
            <p>{event.address}, {event.city}</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Avis</h3>
            {/* Tu pourrais mettre ici des reviews simulés ou réels */}
          </div>
        )}
      </div>
    </div>
  );
}