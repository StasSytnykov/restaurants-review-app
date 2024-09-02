import { ChangeEvent } from "react";
import { InputWithLabel } from "@/components/InputWithLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

const PRICE_RANGE_ITEMS = ["$", "$$", "$$$", "$$$$", "$$$$$"];

interface FormContentProps {
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLocationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPriceRangeChange: (value: string) => void;
  name: string;
  location: string;
  priceRange: string;
}

export const FormContent = ({
  onNameChange,
  onLocationChange,
  onPriceRangeChange,
  name,
  location,
  priceRange,
}: FormContentProps) => {
  return (
    <>
      <InputWithLabel
        name="Name"
        type="name"
        onChange={onNameChange}
        value={name}
      />
      <InputWithLabel
        name="location"
        type="location"
        onChange={onLocationChange}
        value={location}
      />
      <Select onValueChange={onPriceRangeChange} value={priceRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          {PRICE_RANGE_ITEMS.map((priceItem) => (
            <SelectItem key={priceItem} value={priceItem}>
              {priceItem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
