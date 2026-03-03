// features/like-event/ui/LikeButton.tsx
import { Heart } from "lucide-react";
import { toggleLike } from "../model/likeSlice";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

interface LikeButtonProps {
  eventId: string;
}

export function LikeButton({ eventId }: LikeButtonProps) {
  const dispatch = useAppDispatch();
  const liked = useAppSelector(state =>
    state.likes.likedIds.includes(eventId)
  );

  return (
    <button
      onClick={() => dispatch(toggleLike(eventId))}
      aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`p-2 rounded-full transition-colors ${
        liked ? 'text-red-500 hover:text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
      }`}
    >
      <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
    </button>
  );
}