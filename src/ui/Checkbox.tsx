import cn from "@/utils/cn";
import React, { forwardRef, InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <label className={cn("flex gap-1 items-center text-sm", className)}>
        <input ref={ref} className="w-4 h-4" type="checkbox" {...rest} />
        {children}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
