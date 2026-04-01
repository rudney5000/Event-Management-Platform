import type {EventFull} from "../../../../entities/event/model";

interface DetailsTabProps { 
    event: EventFull; 
    t: Function 
}

export function DetailsTab({ event, t }: DetailsTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          {t('eventTabs.aboutEvent')}
        </h3>
        <p className="text-gray-300 leading-7 whitespace-pre-line">
          {event.description || <span className="text-gray-600 italic">Aucune description disponible.</span>}
        </p>
      </div>
 
      <div className="space-y-2 pt-4 border-t border-white/10">
        {/* {event.ageRestriction && (
          <div className="flex items-center gap-3 text-gray-400">
            <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-white">
              {event.ageRestriction}+
            </span>
            <span>Événement réservé aux {event.ageRestriction}+</span>
          </div>
        )} */}
        {event.organizerId && (
          <div className="flex items-center gap-3 text-gray-400">
            <span className="w-5 h-5 flex items-center justify-center">📣</span>
            <span>Présenté par {event.organizerId}</span>
          </div>
        )}
      </div>
    </div>
  );
}