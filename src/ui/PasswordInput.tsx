"use client";
import cn from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: React.ForwardedRef<HTMLInputElement>;
  label: ReactNode;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, className, ...rest }, ref) => {
    const [isShow, setShow] = useState(false);
    return (
      <div className={cn("flex flex-col w-full", className)}>
        <label className="ml-1 text-sm text-zinc-500">{label}</label>
        <div className="flex items-center w-full gap-1 bg-zinc-900 border border-zinc-700  px-2 py-1 rounded-md">
          <input
            ref={ref}
            className="bg-transparent text-start w-full outline-none focus:outline-none"
            {...rest}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\s+/g, "");

              if (rest.onChange) {
                rest.onChange(e);
              }
            }}
            type={isShow ? "text" : "password"}
          />
          <button type="button" onClick={() => setShow((s) => !s)}>
            {isShow ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
