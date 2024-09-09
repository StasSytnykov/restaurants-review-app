import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface LoaderButtonProps {
  isPending: boolean;
  buttonType: "submit" | "reset" | "button" | undefined;
  buttonClasses?: string;
  text: string;
}

export const LoaderButton = ({
  buttonClasses,
  buttonType,
  isPending,
  text,
}: LoaderButtonProps) => (
  <Button type={buttonType} disabled={isPending} className={buttonClasses}>
    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : text}
  </Button>
);
