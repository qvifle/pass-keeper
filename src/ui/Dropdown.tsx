"use client";
import cn from "@/utils/cn";
import React, { HTMLAttributes, ReactNode, useState } from "react";
import Button from "./Button";

interface DropdownProps {
  children: ReactNode;
  items: ReactNode;
}
interface DropdownMenuItemProps extends HTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  danger = false,
  children,
  ...rest
}) => {
  return (
    <button
      className={cn(
        "w-full text-sm duration-100 p-1 rounded-[4px] active:bg-zinc-600 hover:bg-zinc-700 text-start",
        danger && "text-rose-500 hover:bg-rose-700/30 active:bg-rose-800/30"
      )}
      {...rest}>
      {children}
    </button>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ children, items }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative">
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className=" fixed top-0 left-0 w-full h-full "></div>
      )}
      <Button size="icon" onClick={() => setOpen((s) => !s)}>
        {children}
      </Button>
      <div
        onClick={() => {
          setOpen(false);
        }}
        className={cn(
          isOpen ? "visible opacity-100" : "invisible opacity-0",
          "absolute z-20 min-w-[120px] top-[calc(100%+5px)] left-0 bg-zinc-800 p-2 border border-zinc-700 rounded-md duration-100"
        )}>
        {items}
      </div>
    </div>
  );
};

export default Dropdown;
