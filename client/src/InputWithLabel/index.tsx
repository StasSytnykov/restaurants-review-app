import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  name: string;
  type: string;
}

export function InputWithLabel({ name, type }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={type}>{name}</Label>
      <Input type={type} id={type} placeholder={name} />
    </div>
  );
}
