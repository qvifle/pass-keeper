"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface DialogContextProps {
  isCreatePasswordOpen: boolean;
  setCreatePasswordOpen: Dispatch<SetStateAction<boolean>>;

  isEditPasswordOpen: boolean;
  setEditPasswordOpen: Dispatch<SetStateAction<boolean>>;
  editPassword: Password | null;
  setEditPassword: Dispatch<SetStateAction<Password | null>>;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export const DialogContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isCreatePasswordOpen, setCreatePasswordOpen] = useState(false);

  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);
  const [editPassword, setEditPassword] = useState<Password | null>(null);

  const value: DialogContextProps = {
    isCreatePasswordOpen,
    setCreatePasswordOpen,
    isEditPasswordOpen,
    setEditPasswordOpen,
    editPassword,
    setEditPassword,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

const useDialogContext = () => useContext(DialogContext) as DialogContextProps;

export default useDialogContext;
