import { User } from "lucide-react";
import type { EventFull } from "../../../../pages/admin/AdminEventPreviewPage";

interface SpeakersTabProps { 
    event: EventFull; 
    t: Function 
}

export function SpeakersTab({ event, t }: SpeakersTabProps) {
  const speakers = event.speakers;
  if (!speakers || speakers.length === 0) {
    return (
      <div className="py-12 text-center">
        <User className="w-10 h-10 mx-auto text-gray-700 mb-3" />
        <p className="text-gray-600">{t('eventTabs.noSpeakers')}</p>
      </div>
    );
  }
 
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
        Lineup
      </h3>
      {speakers.map((speaker, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold text-white">
              {speaker[0]?.toUpperCase()}
            </div>
            <span className="font-medium text-white">{speaker}</span>
          </div>
          <button className="text-xs font-bold border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors rounded-full px-3 py-1">
            SUIVRE
          </button>
        </div>
      ))}
    </div>
  );
}