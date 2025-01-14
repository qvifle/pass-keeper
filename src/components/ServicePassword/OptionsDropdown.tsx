"use client";
import usePasswordsStore from "@/store/PasswordsStore";
import Dropdown, { DropdownMenuItem } from "@/ui/Dropdown";
import React from "react";

const ServicePasswordOptionsDropdown = ({
  password,
}: {
  password: Password;
}) => {
  const { deletePasswordById } = usePasswordsStore();
  return (
    <Dropdown
      items={
        <>
          <DropdownMenuItem onClick={() => console.log("hello")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deletePasswordById(password.id)}
            danger>
            Delete
          </DropdownMenuItem>
        </>
      }>
      <span className="mb-2">...</span>
    </Dropdown>
  );
};

export default ServicePasswordOptionsDropdown;
