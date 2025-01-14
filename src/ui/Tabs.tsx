import cn from "@/utils/cn";
import React, { ReactNode } from "react";

export interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  const content = tabs.find((tab) => tab.label === activeTab)?.content;

  return (
    <div className="w-full h-full ">
      <div className="flex items-center mx-auto w-fit">
        {tabs.map(({ label }) => (
          <button
            onClick={() => setActiveTab(label)}
            className={cn(
              "outline-none px-2 py-1 border-y first:border-l first:rounded-l-md last:border-r last:rounded-r -md border-zinc-800  duration-150",
              label == activeTab
                ? "bg-zinc-800"
                : "bg-zinc-900 hover:bg-zinc-800"
            )}>
            {label}
          </button>
        ))}
      </div>

      <div className="">{content}</div>
    </div>
  );
};

export default Tabs;
