import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ShareButtonProps {
  eventId: string;
  variant?: "default" | "hero" | "compact";
  className?: string;
}

export function ShareButton({ eventId, variant = "default", className = "" }: ShareButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/events/${eventId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return "p-3 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors";
      case "compact":
        return "p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors";
      default:
        return "flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors";
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`${getVariantStyles()} ${className}`}
      aria-label={t('eventPage.share')}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          {variant !== "hero" && variant !== "compact" && (
            <span>{t('eventPage.copied', 'Copied!')}</span>
          )}
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          {variant !== "hero" && variant !== "compact" && (
            <span>{t('eventPage.share', 'Share')}</span>
          )}
        </>
      )}
    </button>
  );
}