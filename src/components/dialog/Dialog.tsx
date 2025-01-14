"use client";
import Button from "@/ui/Button";
import cn from "@/utils/cn";
import { X } from "lucide-react";
import React, { HTMLAttributes, useEffect, useRef } from "react";

export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeButton?: boolean;
  title: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  setOpen,
  children,
  className,
  title,
  closeButton = true,
  ...rest
}) => {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      }}
      ref={dialogRef}
      className={cn(
        "outline-none bg-zinc-900 text-zinc-100 p-3 rounded-lg",
        className
      )}
      {...rest}>
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {closeButton && (
          <Button
            size="icon"
            variant={"outline"}
            onClick={() => setOpen(false)}>
            <X size={16} />
          </Button>
        )}
      </div>
      {children}
    </dialog>
  );
};

export default Dialog;
