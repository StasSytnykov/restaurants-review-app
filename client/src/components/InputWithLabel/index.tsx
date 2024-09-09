import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface InputWithLabelProps {
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  id: string;
}

export function InputWithLabel({
  name,
  type,
  onChange,
  value,
  required,
  id,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={type}>{name}</Label>
      <Input
        type={type}
        id={id}
        placeholder={name}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
}
