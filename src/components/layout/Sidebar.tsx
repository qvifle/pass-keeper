"use client";
import useDialogContext from "@/context/DialogContext";
import Button from "@/ui/Button";
import { Github, Link as LinkIcon, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { setCreatePasswordOpen } = useDialogContext();
  return (
    <aside className="bg-zinc-950 border-r border-zinc-800 p-2">
      <div className="flex w-full flex-col gap-1">
        <Button
          icon={<Plus size={14} />}
          onClick={() => setCreatePasswordOpen(true)}
          className="w-full"
          variant="outline">
          Add password
        </Button>
        <Link target="_blank" href={"https://github.com/qvifle/pass-keeper"}>
          <Button
            icon={<Github size={14} />}
            className="w-full"
            variant="outline">
            Repository
          </Button>
        </Link>
        <Link
          href="https://tyumen.hh.ru/resume/1ae028acff0dcf1cea0039ed1f423334697652"
          target="_blank">
          <Button
            icon={<LinkIcon size={14} />}
            className="w-full"
            variant="outline">
            CV
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
