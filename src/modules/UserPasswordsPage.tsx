"use client";
import usePasswordsStore from "@/store/PasswordsStore";
import CreatePasswordDialog from "@/components/dialog/CreatePasswordDialog";
import ServicePassword from "@/components/ServicePassword";
import Button from "@/ui/Button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";



const UserPasswordsPage = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const { passwords } = usePasswordsStore();

  useEffect(() => {
    console.log(passwords);
  }, [passwords]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">My passwords</h1>
      <div className="flex flex-col gap-[6px] mb-2">
        {passwords.map((password, index) => (
          <ServicePassword key={index} password={password} />
        ))}
      </div>

      <Button
        onClick={() => setModalOpen((s) => !s)}
        icon={<Plus size={14} />}
        variant="outline">
        Add Password
      </Button>

      <CreatePasswordDialog setOpen={setModalOpen} isOpen={isModalOpen} />
    </div>
  );
};

export default UserPasswordsPage;
