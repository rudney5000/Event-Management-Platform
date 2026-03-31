import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export function BackButton({ className = "", label = "Retour" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors ${className}`}
    >
      <ChevronLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}