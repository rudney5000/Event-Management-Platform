import { useState } from "react";

interface EventGalleryProps {
  images: string[];
}

export function EventGallery({ images }: EventGalleryProps) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[21/9] mb-6">
      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIndex(i => (i - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
          >
            ◀
          </button>
          <button
            onClick={() => setIndex(i => (i + 1) % images.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
}