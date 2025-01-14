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
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  modalContent: ReactNode;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
}

const DialogContext = createContext<null | DialogContextProps>(null);

export const DialogContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const value: DialogContextProps = {
    isOpen,
    setOpen,
    modalContent,
    setModalContent,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

const useDialogContext = () => useContext(DialogContext) as DialogContextProps;

export default useDialogContext;
