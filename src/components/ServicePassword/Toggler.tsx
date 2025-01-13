"use client";
import copyToClipboard from "@/utils/copyToClipboard";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const securedValue = "********";

interface TogglerProps {
  password: string;
}

const Toggler: React.FC<TogglerProps> = ({ password }) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setVisible((s) => !s)}>
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      <span
        onClick={() => copyToClipboard(password)}
        className="text-zinc-400 select-none cursor-pointer relative w-full h-6">
        {isVisible ? (
          password
        ) : (
          <span className="absolute top-[2px] left-0 h-4">{securedValue}</span>
        )}
      </span>
    </div>
  );
};

export default Toggler;
