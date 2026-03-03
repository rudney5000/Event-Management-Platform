import { Heart } from "lucide-react";
import { toggleLike } from "../model/likeSlice";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

export function LikeButton({ eventId }: { eventId: string }) {
  const dispatch = useAppDispatch();
  const liked = useAppSelector(state =>
    state.likes.likedIds.includes(eventId)
  );

  return (
    <button onClick={() => dispatch(toggleLike(eventId))}>
      <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
    </button>
  );
}