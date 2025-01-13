import cn from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const buttonVariants = cva(" duration-200", {
  variants: {
    variant: {
      primary:
        "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600",
      secondary:
        "bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 active:bg-zinc-800",
      outline: "bg-zinc-950  hover:bg-zinc-900 active:bg-zinc-800",
    },
    size: {
      icon: "rounded-md w-7 h-7 flex items-center justify-center",
      medium: "rounded-md p-1",
    },
  },
});

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  icon,
  ...rest
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant }),
        rest.className,
        icon && "flex items-center gap-1"
      )}
      {...rest}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
