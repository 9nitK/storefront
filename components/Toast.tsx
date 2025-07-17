import type { Toast } from "@/context/ToastContext";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export default function Toast({ toast, onRemove }: ToastProps) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-900/90 border-green-500/50";
      case "error":
        return "bg-red-900/90 border-red-500/50";
      case "info":
        return "bg-blue-900/90 border-blue-500/50";
      default:
        return "bg-gray-900/90 border-gray-500/50";
    }
  };

  return (
    <div
      className={`${getBgColor()} backdrop-blur-sm border rounded-lg p-4 shadow-lg max-w-sm w-full flex items-start gap-3 animate-in slide-in-from-right-full duration-300`}
    >
      {getIcon()}
      <div className="flex-1">
        <p className="text-white text-sm">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
