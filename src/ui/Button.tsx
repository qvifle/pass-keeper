import cn from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  loading?: boolean;
}

const buttonVariants = cva(" duration-200", {
  variants: {
    variant: {
      primary:
        "bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 active:bg-zinc-600",
      secondary:
        "bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 active:bg-zinc-800",
      outline: "bg-zinc-900  hover:bg-zinc-800 active:bg-zinc-700",
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
  className,
  loading = false,
  ...rest
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant }),
        (icon || loading) && "flex items-center gap-1",
        className
      )}
      type="button"
      {...rest}>
      {loading ? <Loader size={16} className="animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default Button;
