import cn from "@/utils/cn";
import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: React.ForwardedRef<HTMLInputElement>;
  label: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...rest }, ref) => {
    return (
      <div className={cn("flex flex-col w-full", className)}>
        <label className="ml-[2px] text-start text-sm text-zinc-500">{label}</label>
        <input
          ref={ref}
          className="bg-zinc-900 outline-none focus:outline-none border border-zinc-700  px-2 py-1 rounded-md "
          {...rest}
        />
      </div>
    );
  }
);



Input.displayName = "Input";

export default Input;
