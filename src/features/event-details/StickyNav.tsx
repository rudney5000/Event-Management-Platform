import { type TabId } from "../event-list/ui/event-details-tabs";

interface StickyNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const tabs = [
  { id: 'details', label: 'Details' },
  { id: 'speakers', label: 'Lineup' },
  { id: 'location', label: 'Venue' },
  { id: 'reviews', label: 'Reviews' },
] as const;

export function StickyNav({ activeTab, setActiveTab }: StickyNavProps) {
  return (
    <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 text-sm font-medium transition-all relative
                ${activeTab === tab.id 
                  ? 'text-[#f5c518]' 
                  : 'text-gray-400 hover:text-white'
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f5c518]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}