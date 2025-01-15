"use client";

import { useLocalStorage } from "usehooks-ts";

const usePasswordsStore = () => {
  const [passwords, setPasswords] = useLocalStorage<Password[]>(
    "passwords",
    [],
    { initializeWithValue: false }
  );

  const addPassword = (password: PasswordValue) => {
    setPasswords((s) => [...s, { id: s.length, ...password }]);
  };

  const deletePasswordById = (id: number) => {
    setPasswords((s) => s.filter((p) => p.id != id));
  };

  const updatePassword = (id: number, newValue: PasswordValue) => {
    setPasswords((s) => s.map((p) => (p.id == id ? { id, ...newValue } : p)));
  };

  return { passwords, addPassword, deletePasswordById, updatePassword };
};

export default usePasswordsStore;
