import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { useGetCitiesQuery } from "../../entities/city";

interface EventVenueProps {
  address?: string;
  cityId?: string;
}

export function EventVenue({ address, cityId }: EventVenueProps) {
  const { data: cities } = useGetCitiesQuery();
  const city = cities?.find(c => c.id === cityId);
  
  const fullAddress = `${address || ''}, ${city?.name || ''}`.trim();
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;

  if (!fullAddress) {
    return (
      <div className="bg-white/5 rounded-2xl p-8 text-center">
        <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">Venue information coming soon</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Venue Information</h3>
        
        <div className="flex items-start gap-3 mb-6">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="text-white font-medium">{city?.name || 'Venue'}</p>
            <p className="text-gray-400 text-sm">{fullAddress}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#f5c518] text-black rounded-lg text-sm font-medium hover:bg-[#f5c518]/90 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </a>
          
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View on Maps
          </a>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl overflow-hidden h-64">
        <iframe
          title="Venue Map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}