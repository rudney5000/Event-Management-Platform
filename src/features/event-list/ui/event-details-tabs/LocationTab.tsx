import { useState } from "react";
import { useGetCitiesQuery } from "../../../../entities/city";
import { Check, Copy, MapPin } from "lucide-react";
import type {EventFull} from "../../../../entities/event/model";

interface LocationTabProps { 
    event: EventFull; 
    t: Function 
}

export function LocationTab({ event }: LocationTabProps) {
  const [copied, setCopied] = useState(false);
  const { data: cities } = useGetCitiesQuery();
  const city = cities?.find(c => c.id === event.cityId);
  const address = `${event.address || ''}, ${city?.name || ''}`.trim().replace(/^,\s*/, '').replace(/,\s*$/, '');
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
 
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          Lieu
        </h3>
        {event.address && (
          <p className="text-white text-lg font-bold mb-1">{event.address}</p>
        )}
        <div className="flex items-start gap-2 text-gray-400">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{address || 'Adresse non renseignée'}</span>
        </div>
      </div>
 
      <div className="flex gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-sm text-white hover:bg-white/5 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          Ouvrir dans Maps
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-sm text-gray-300 hover:bg-white/5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
 
      {event.coordinates?.lat && event.coordinates.lng ? (
        <div className="rounded-xl overflow-hidden border border-white/10 h-52">
          <iframe
            title="map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-omitted&q=${event.coordinates.lat},${event.coordinates.lng}`}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 h-40 flex items-center justify-center text-gray-700">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">Carte non disponible</p>
          </div>
        </div>
      )}
    </div>
  );
}