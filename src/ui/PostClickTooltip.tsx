"use client";
import React, { HTMLAttributes, ReactNode, useState } from "react";

interface PostClickTooltipProps extends HTMLAttributes<HTMLDivElement> {
  text: ReactNode;
}

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return (
    <div className="absolute pointer-events-none select-none top-0 left-[-50%] p-1 rounded-md text-xs bg-zinc-800 border border-zinc-700 appear-animation ">
      {children}
    </div>
  );
};

const PostClickTooltip: React.FC<PostClickTooltipProps> = ({
  children,
  text,
}) => {
  const [isShow, setShow] = useState(false);

  return (
    <div
      className="relative"
      onClick={() => {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }}>
      {children}
      {isShow && <Tooltip>{text}</Tooltip>}
    </div>
  );
};

export default PostClickTooltip;
