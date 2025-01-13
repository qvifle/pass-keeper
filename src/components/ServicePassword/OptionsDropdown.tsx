"use client";
import Dropdown, { DropdownMenuItem } from "@/ui/Dropdown";
import React from "react";

const ServicePasswordOptionsDropdown = () => {
  return (
    <Dropdown
      items={
        <>
          <DropdownMenuItem onClick={() => console.log("hello")}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem danger>Delete</DropdownMenuItem>
        </>
      }>
      <span className="mb-2">...</span>
    </Dropdown>
  );
};

export default ServicePasswordOptionsDropdown;
