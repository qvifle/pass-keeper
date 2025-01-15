"use client";
import useDialogContext from "@/context/DialogContext";
import usePasswordsStore from "@/store/PasswordsStore";
import Dropdown, { DropdownMenuItem } from "@/ui/Dropdown";
import emulateLoading from "@/utils/emulateLoading";
import React, { useState } from "react";

const ServicePasswordOptionsDropdown = ({
  password,
}: {
  password: Password;
}) => {
  const { setEditPassword, setEditPasswordOpen } = useDialogContext();
  const { deletePasswordById } = usePasswordsStore();

  const onDelete = (passwordId: number) => {
    emulateLoading({
      delayAverage: { from: 500, to: 1500 },
      onSucces: () => {
        deletePasswordById(passwordId);
        alert("Service succesfully deleted");
      },
      onError: () => {
        alert("Something went wrong");
      },
    });
  };
  return (
    <Dropdown
      items={
        <>
          <DropdownMenuItem
            onClick={() => {
              setEditPassword(password);
              setEditPasswordOpen(true);
            }}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(password.id)} danger>
            Delete
          </DropdownMenuItem>
        </>
      }>
      <span className="mb-2">...</span>
    </Dropdown>
  );
};

export default ServicePasswordOptionsDropdown;
