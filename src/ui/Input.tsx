import cn from "@/utils/cn";
import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: any;
  label: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...rest }, ref) => {
    return (
      <div className={cn("flex flex-col", className)}>
        <label className="ml-1 text-sm text-zinc-500">{label}</label>
        <input
          ref={ref}
          className="bg-zinc-900 outline-none focus:outline-none border border-zinc-700  px-2 py-1 rounded-md "
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
