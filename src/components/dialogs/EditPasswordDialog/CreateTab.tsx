"use client";
import usePasswordsStore from "@/store/PasswordsStore";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import PasswordInput from "@/ui/PasswordInput";
import emulateLoading from "@/utils/emulateLoading";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreatePasswordFormFields {
  service: string;
  password: string;
}

const CreateTab = ({
  setOpen,
  password,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  password: Password | null;
}) => {
  const [isLoading, setLoading] = useState(false);
  const { updatePassword } = usePasswordsStore();

  const { register, handleSubmit, getValues, reset } =
    useForm<CreatePasswordFormFields>();

  const closeDialog = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<CreatePasswordFormFields> = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timer = emulateLoading({
      delayAverage: { from: 500, to: 1500 },
      onSucces: () => {
        if (!password) {
          throw new Error("PasswordId is undefined");
        }

        updatePassword(password.id, getValues());

        alert("Password succesfully saved!");
        closeDialog();
      },
      onError: () => {
        alert("Something went wrong");
      },
      onEnd: () => {
        setLoading(false);
      },
    });

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 w-full mb-2">
        <Input
          label="Service name"
          placeholder="Your service"
          defaultValue={password?.service}
          {...register("service", { required: true })}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          defaultValue={password?.password}
          {...register("password", { required: true })}
        />
      </div>

      <div className="w-full flex justify-end gap-1">
        <Button onClick={closeDialog}>Cancel</Button>
        <Button loading={isLoading} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateTab;
