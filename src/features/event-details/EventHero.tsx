import { BackButton, LikeButton, ShareButton } from "../../shared/ui/buttons";
import type {EventFull} from "../../entities/event/model";

interface EventHeroProps {
  event: EventFull;
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        {event.imageUrl ? (
          <>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover scale-105"
              style={{ filter: 'brightness(0.6)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900 to-black" />
        )}
      </div>

      <div className="absolute top-6 right-6 flex gap-3 z-20">
        <LikeButton eventId={event.id} />
        <ShareButton eventId={event.id} variant="hero" />
      </div>

      <BackButton className="absolute top-6 left-6 z-20" />

      <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-3 py-1 bg-[#f5c518] text-black text-xs font-bold uppercase rounded-full mb-4">
            {event.categoryId || 'Event'}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight max-w-4xl">
            {event.title}
          </h1>
          <p className="text-gray-300 mt-4 text-lg">
            {event.organizerId}
          </p>
        </div>
      </div>
    </div>
  );
}