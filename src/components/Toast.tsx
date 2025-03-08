import { CheckCircle, X, XCircle } from "lucide-react";
import type { ToastProps } from "../types";

export const Toast = ({ message, type, onClose }: ToastProps) => (
  <div
    className={`fixed bottom-4 z-50 flex translate-x-0 transform items-center space-x-2 rounded-lg p-4 shadow-lg transition-all ${
      type === "success"
        ? "bg-green-50 text-green-800"
        : "bg-red-50 text-red-800"
    }`}
  >
    {type === "success" ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    )}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-4">
      <X className="h-4 w-4 opacity-60 hover:opacity-100" />
    </button>
  </div>
);
