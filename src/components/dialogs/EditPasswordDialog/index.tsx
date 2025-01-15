"use client";
import React, { useState } from "react";
import Dialog, { DialogProps } from "../Dialog";
import Tabs, { Tab } from "@/ui/Tabs";
import GenerateTab from "./GenerateTab";
import CreateTab from "./CreateTab";
import useDialogContext from "@/context/DialogContext";

const EditPasswordDialog = () => {
  const {
    isEditPasswordOpen: isOpen,
    setEditPasswordOpen: setOpen,
    editPassword,
  } = useDialogContext();
  const [activeTab, setActiveTab] = useState("Create");
  const tabs: Tab[] = [
    {
      label: "Create",
      content: <CreateTab password={editPassword} setOpen={setOpen} />,
    },
    {
      label: "Generate",
      content: <GenerateTab password={editPassword} setOpen={setOpen} />,
    },
  ];

  return (
    <Dialog
      title="Update password"
      className="min-w-[600px]"
      isOpen={isOpen}
      setOpen={setOpen}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
    </Dialog>
  );
};

export default EditPasswordDialog;
