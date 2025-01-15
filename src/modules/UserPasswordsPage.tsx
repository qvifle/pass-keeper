"use client";
import usePasswordsStore from "@/store/PasswordsStore";
import ServicePassword from "@/components/cards/PasswordCard";
import Button from "@/ui/Button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Input from "@/ui/Input";
import useDialogContext from "@/context/DialogContext";

const UserPasswordsPage = () => {
  const { setCreatePasswordOpen } = useDialogContext();
  const [search, setSearch] = useState("");
  const { passwords } = usePasswordsStore();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">My passwords</h1>
      <Input
        label="Search"
        className="mb-4 w-[400px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-[6px] mb-2 max-w-[600px]">
        {passwords
          .filter((password) => password.service.includes(search))
          .map((password, index) => (
            <ServicePassword key={index} password={password} />
          ))}
      </div>

      <Button
        onClick={() => setCreatePasswordOpen(true)}
        icon={<Plus size={14} />}
        variant="outline">
        Add Password
      </Button>
    </div>
  );
};

export default UserPasswordsPage;
