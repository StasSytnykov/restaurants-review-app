import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { InputWithLabel } from "@/components/InputWithLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRICE_RANGE_ITEMS = ["$", "$$", "$$$", "$$$$", "$$$$$"];

export const NewRestaurantPanel = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onPriceRangeChange = (value: string) => {
    setPriceRange(value);
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  console.log(name);
  console.log(location);
  console.log(priceRange);

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex gap-4 justify-center items-end"
    >
      <InputWithLabel name="Name" type="name" onChange={onLocationChange} />
      <InputWithLabel name="location" type="location" onChange={onNameChange} />
      <Select onValueChange={onPriceRangeChange}>
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
      <Button type="submit">Add</Button>
    </form>
  );
};
