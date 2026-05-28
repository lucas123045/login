"use client";

import { useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export default function InputField({
  label,
  error,
  isPassword = false,
  className = "",
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : props.type || "text";

  return (
    <div className="flex flex-col gap-1">
      <div className="ig-input-wrapper">
        {/* Floating label input */}
        <div
          className={`
            relative border rounded-[3px] bg-[#FAFAFA] transition-all duration-150
            ${error ? "border-[#ED4956]" : "border-[#DBDBDB] focus-within:border-[#a8a8a8]"}
          `}
        >
          <input
            {...props}
            type={inputType}
            placeholder=" "
            className={`
              peer w-full px-3 pt-4 pb-1.5 text-sm bg-transparent outline-none
              ${isPassword ? "pr-16" : "pr-3"}
              ${className}
            `}
          />
          <label
            className="
              absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E8E] text-xs pointer-events-none
              transition-all duration-150
              peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px]
              peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]
            "
          >
            {label}
          </label>

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#262626] hover:text-[#8E8E8E] transition-colors"
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={2} />
              ) : (
                <Eye size={16} strokeWidth={2} />
              )}
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-[#ED4956] px-1">{error}</p>
      )}
    </div>
  );
}
