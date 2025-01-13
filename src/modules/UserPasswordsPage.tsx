import ServicePassword from "@/components/ServicePassword";
import Button from "@/ui/Button";
import { Plus } from "lucide-react";
import React from "react";

interface KeyValue {
  name: string;
  password: string;
}

const passwords: KeyValue[] = [
  { name: "GitHub", password: "HelloWorld123" },
  { name: "LinkedIn", password: "myPass337" },
  { name: "HeadHunter", password: "shar1kWho854" },
];

const UserPasswordsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">My passwords</h1>
      <div className="flex flex-col gap-[6px] mb-2">
        {passwords.map((el, index) => (
          <ServicePassword key={index} {...el} />
        ))}
      </div>

      <Button icon={<Plus size={14} />} variant="outline">
        Add Password
      </Button>
    </div>
  );
};

export default UserPasswordsPage;
