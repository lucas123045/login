"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";

interface AlertProps {
  type: "error" | "success";
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`
        flex items-start gap-2.5 p-3 rounded-[4px] text-sm
        success-banner
        ${isError
          ? "bg-[#FFF0F1] border border-[#ED4956]/30 text-[#ED4956]"
          : "bg-[#F0FFF4] border border-[#2ECC71]/30 text-[#1a8a4a]"
        }
      `}
    >
      {isError ? (
        <AlertCircle size={16} className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
      )}
      <span className="flex-1 leading-snug">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
