import { Calendar, MapPin, Tag } from "lucide-react";

interface EventHeaderProps {
  title: string;
  organizer?: string;
  formattedDate: string | null;
  formattedTime: string | null;
  category?: string;
  city?: string;
}

export function EventHeader({ 
  title, 
  organizer, 
  formattedDate, 
  formattedTime,
  category,
  city 
}: EventHeaderProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex flex-wrap gap-6">
        {formattedDate && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f5c518]/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#f5c518]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Date & Time</p>
              <p className="text-white font-medium">
                {formattedDate}
                {formattedTime && ` at ${formattedTime}`}
              </p>
            </div>
          </div>
        )}

        {city && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Location</p>
              <p className="text-white font-medium">{city}</p>
            </div>
          </div>
        )}

        {category && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Category</p>
              <p className="text-white font-medium">{category}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}