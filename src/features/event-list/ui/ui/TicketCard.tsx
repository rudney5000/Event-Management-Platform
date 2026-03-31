import { Clock } from "lucide-react";
import type { EventFull } from "../../../../pages/admin/AdminEventPreviewPage";

export function TicketCard({ event }: { event: EventFull }) {
  const isSoldOut = event.availableSeats === 0;
 
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {isSoldOut ? (
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-2xl font-bold">
                {event.price ? `${event.price} ${event.currencyId || '€'}` : 'Gratuit'}
              </p>
              <p className="text-gray-400 text-sm mt-1">Rejoindre la liste d'attente</p>
            </div>
            <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-2.5 py-1">
              COMPLET
            </span>
          </div>
          <button className="w-full py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors">
            Liste d'attente
          </button>
        </div>
      ) : (
        <div className="p-5">
          <p className="text-2xl font-bold mb-1">
            {event.price ? `${event.price} ${event.currencyId || '€'}` : 'Gratuit'}
          </p>
          {event.availableSeats && (
            <p className="text-gray-400 text-sm mb-4">
              {event.availableSeats} places restantes
            </p>
          )}
          <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors">
            Acheter un billet
          </button>
        </div>
      )}
 
      {event.address && (
        <div className="border-t border-white/10 p-5">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Lieu</p>
          <p className="text-sm font-semibold text-white">{event.address}</p>
          <p className="text-sm text-gray-400">{event.address}</p>
        </div>
      )}
 
      {event.startTime && (
        <div className="border-t border-white/10 px-5 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          Ouverture des portes : <span className="text-white font-medium">{event.startTime}</span>
        </div>
      )}
    </div>
  );
}