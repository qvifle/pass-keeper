"use client";
import React, { useEffect, useMemo, useState } from "react";
import Input from "@/ui/Input";
import Checkbox from "@/ui/Checkbox";
import Button from "@/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import generatePassword from "@/utils/generatePassword";
import { Dices } from "lucide-react";
import CopyButton from "../../buttons/CopyButton";
import usePasswordsStore from "@/store/PasswordsStore";
import getRandomNumber from "@/utils/getRandomNumber";
import preventLimitValue from "@/utils/preventLimitValue";
import emulateLoading from "@/utils/emulateLoading";

interface GeneratePasswordFormFields {
  serviceName: string;

  length: number;
  letters: boolean;
  numbers: boolean;
  specSymbols: boolean;
  lowercase: boolean;
  uppercase: boolean;

  isCustomSymbols: boolean;
  customSymbols: string;
}

const GenerateTab = ({
  setOpen,
  password,
}: {
  password: Password | null;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updatePassword } = usePasswordsStore();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, watch, getValues, reset } =
    useForm<GeneratePasswordFormFields>();

  const onSubmit: SubmitHandler<GeneratePasswordFormFields> = () => {
    if (!generatedPassword) {
      return;
    }
    setLoading(true);
  };

  const dialogReset = () => {
    reset();
    setGeneratedPassword("");
  };

  const closeDialog = () => {
    setOpen(false);
    dialogReset();
  };

  const length = watch("length");
  const letters = watch("letters");
  const numbers = watch("numbers");
  const specSymbols = watch("specSymbols");
  const lowercase = watch("lowercase");
  const uppercase = watch("uppercase");
  const isCustomSymbols = watch("isCustomSymbols");
  const customSymbols = watch("customSymbols");

  const generated = useMemo(() => {
    if (
      (!letters && !numbers && !specSymbols) ||
      (!lowercase && !uppercase && !isCustomSymbols && !customSymbols)
    ) {
      return "";
    }

    return generatePassword({
      length,
      letters,
      numbers,
      specSymbols,
      lowercase,
      uppercase,
      customSymbols: isCustomSymbols ? customSymbols : undefined,
    });
  }, [
    length,
    letters,
    numbers,
    specSymbols,
    lowercase,
    uppercase,
    isCustomSymbols,
    customSymbols,
  ]);

  useEffect(() => {
    setGeneratedPassword(generated);
  }, [generated]);

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
        updatePassword(password.id, {
          service: getValues().serviceName,
          password: generatedPassword,
        });

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <div>
          <Input
            id="length"
            label="Length"
            type="number"
            min="1"
            className="mb-1"
            {...register("length", {
              required: true,
              valueAsNumber: true,
              onChange: (e) => preventLimitValue(100, e),
            })}
          />

          <Checkbox defaultChecked {...register("letters")}>
            Letters
          </Checkbox>
          <Checkbox {...register("numbers")}>Numbers</Checkbox>
          <Checkbox {...register("specSymbols")} className="mb-1">
            Special sybmols
          </Checkbox>
          <div className="flex gap-1 mb-2">
            <Checkbox defaultChecked {...register("lowercase")}>
              Lowercase
            </Checkbox>
            <Checkbox {...register("uppercase")}>Uppercase</Checkbox>
          </div>

          <Input
            className="mb-1"
            label="Characters"
            disabled={!isCustomSymbols}
            {...register("customSymbols")}
          />
          <Checkbox {...register("isCustomSymbols")}>
            Custom characters
          </Checkbox>
        </div>

        <div>
          <Input
            placeholder="Service name"
            className="mb-1"
            label="Service"
            defaultValue={password?.service}
            {...register("serviceName", { required: true })}
          />

          <div className="flex gap-1 items-end ">
            <Input
              label="Generated Password"
              disabled
              value={generatedPassword}
            />
            <CopyButton copyValue={generated} />
            <Button
              size="icon"
              onClick={() => setGeneratedPassword(generatePassword(watch()))}>
              <Dices size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end gap-1">
        <Button onClick={closeDialog} type="button">
          Cancel
        </Button>
        <Button loading={isLoading} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default GenerateTab;
