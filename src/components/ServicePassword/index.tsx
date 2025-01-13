import React, { HTMLAttributes } from "react";
import ServicePasswordOptionsDropdown from "./OptionsDropdown";
import Toggler from "./Toggler";
import CopyButton from "../buttons/CopyButton";

interface ServicePasswordProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  password: string;
}

const ServicePassword: React.FC<ServicePasswordProps> = ({
  name,
  password,
  ...rest
}) => {
  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-md p-2 grid grid-cols-[1fr,1fr,auto] max-w-[600px]"
      {...rest}>
      <div className="flex flex-col">
        <span>{name}</span>
        <span className="text-xs text-zinc-400">Service Name</span>
      </div>
      <Toggler password={password} />
      <div className="flex items-center gap-1">
        <CopyButton copyValue={password} />
        <ServicePasswordOptionsDropdown />
      </div>
    </div>
  );
};

export default ServicePassword;
