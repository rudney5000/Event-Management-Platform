import { MessageSquare } from "lucide-react";

export function ReviewsTab({ t }: { t: Function }) {
  return (
    <div className="py-12 text-center">
      <MessageSquare className="w-10 h-10 mx-auto text-gray-700 mb-3" />
      <p className="text-gray-600">{t('eventTabs.noReviews')}</p>
    </div>
  );
}