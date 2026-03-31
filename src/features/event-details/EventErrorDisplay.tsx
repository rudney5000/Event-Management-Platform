import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface EventErrorDisplayProps {
  error?: unknown;
  onRetry?: () => void;
}

export function EventErrorDisplay({ error, onRetry }: EventErrorDisplayProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const errorMessage = error instanceof Error ? error.message : t('eventPage.error');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('eventPage.errorTitle', 'Something went wrong')}
        </h2>
        
        <p className="text-gray-400 mb-6">
          {errorMessage}
        </p>
        
        <div className="flex gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#f5c518] text-black rounded-lg font-medium hover:bg-[#f5c518]/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {t('common.retry', 'Retry')}
            </button>
          )}
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            {t('common.goHome', 'Go Home')}
          </button>
        </div>
      </div>
    </div>
  );
}