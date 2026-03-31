import { Share2, CalendarPlus, Bell } from "lucide-react";

interface EventActionsProps {
  eventId: string;
  onShare: () => void;
}

export function EventActions({ eventId, onShare }: EventActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onShare}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors">
        <CalendarPlus className="w-4 h-4" />
        <span>Add to Calendar</span>
      </button>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors">
        <Bell className="w-4 h-4" />
        <span>Remind Me</span>
      </button>
    </div>
  );
}