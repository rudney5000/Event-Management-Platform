import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {toggleLike} from "../../../features/like-event/model";
import {memo} from "react";
import {selectIsLiked} from "../../../features/like-event/model";

interface LikeButtonProps {
  eventId: string;
}

export const LikeButton = memo(function LikeButton({ eventId }: LikeButtonProps) {
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) =>
      selectIsLiked(state, eventId)
  );

  return (
    <button
      onClick={() => dispatch(toggleLike(eventId))}
      aria-label={isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={`p-2 rounded-full transition-colors ${
          isLiked
          ? 'text-red-500 hover:text-red-600 bg-red-50'
          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
      }`}
    >
      <Heart className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
    </button>
  );
});
