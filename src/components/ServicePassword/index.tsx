import React, { HTMLAttributes } from "react";
import ServicePasswordOptionsDropdown from "./OptionsDropdown";
import Toggler from "./Toggler";
import CopyButton from "../buttons/CopyButton";

interface ServicePasswordProps extends HTMLAttributes<HTMLDivElement> {
  password: Password;
}

const ServicePassword: React.FC<ServicePasswordProps> = ({
  password,
  ...rest
}) => {
  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-md p-2 grid gap-2 grid-cols-[1fr,1fr,auto] max-w-[800px]"
      {...rest}>
      <div className="flex flex-col">
        <span>{password.service}</span>
        <span className="text-xs text-zinc-400">Service Name</span>
      </div>
      <Toggler password={password.password} />
      <div className="flex items-center gap-1">
        <CopyButton copyValue={password.password} />
        <ServicePasswordOptionsDropdown password={password} />
      </div>
    </div>
  );
};

export default ServicePassword;
