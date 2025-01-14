"use client";
import React, { useEffect, useMemo, useState } from "react";
import Dialog, { DialogProps } from "./Dialog";
import Input from "@/ui/Input";
import Checkbox from "@/ui/Checkbox";
import Button from "@/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import generatePassword from "@/utils/generatePassword";
import { Dices, X } from "lucide-react";
import CopyButton from "../buttons/CopyButton";
import usePasswordsStore from "@/store/PasswordsStore";
import getRandomNumber from "@/utils/getRandomNumber";
import preventLimitValue from "@/utils/preventLimitValue";
import Tabs, { Tab } from "@/ui/Tabs";

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

const CreatePasswordDialog: React.FC<Omit<DialogProps, "title">> = ({
  isOpen,
  setOpen,
}) => {
  const [activeTab, setActiveTab] = useState("Create");
  const tabs: Tab[] = [
    { label: "Create", content: <div>Create</div> },
    { label: "Generate", content: <GenerateTab setOpen={setOpen} /> },
  ];

  return (
    <Dialog
      title="Add password"
      className="min-w-[600px]"
      isOpen={isOpen}
      setOpen={setOpen}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
    </Dialog>
  );
};

const GenerateTab = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { addPassword } = usePasswordsStore();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, watch, getValues, reset } =
    useForm<GeneratePasswordFormFields>();

  const onSubmit: SubmitHandler<GeneratePasswordFormFields> = (data) => {
    setLoading(true);
  };

  const dialogReset = () => {
    reset();
    setGeneratedPassword("");
  };

  const closeDialog = () => {
    // setOpen(false);
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

    return () => {
      console.log("unmount");
    };
  }, [generated]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const delay = getRandomNumber(500, 1500);
    const isSucces = !!getRandomNumber(0, 1);

    const timer = setTimeout(() => {
      if (isSucces) {
        addPassword({
          service: getValues().serviceName,
          password: generatedPassword,
        });

        alert("Password succesfully saved!");
        closeDialog();
      } else {
        alert("Something went wrong");
      }
      setLoading(false);
    }, delay);

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
            {...register("serviceName")}
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

export default CreatePasswordDialog;
