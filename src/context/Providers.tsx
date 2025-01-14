import React, { ReactNode } from "react";
import { DialogContextProvider } from "./DialogContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <DialogContextProvider>{children}</DialogContextProvider>;
};

export default Providers;
