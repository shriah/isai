/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { useField } from "remix-validated-form";

import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldProps = {
  name: string;
  label: string;
  type?: "text" | "number";
};

export const InputField = ({ name, label, type }: InputFieldProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Label htmlFor={name}>{label}</Label>
        <Input {...getInputProps({ id: name })} type={type || "text"} />
      </div>
      {error && <Alert>{error}</Alert>}
    </div>
  );
};
