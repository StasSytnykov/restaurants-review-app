import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addRestaurants } from "@/api/addRestaurant.ts";
import { Restaurant } from "@/Types";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
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
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      location,
      price_range,
    }: Omit<Restaurant, "restaurant_uid">) => {
      return addRestaurants(name, location, price_range);
    },
    onSuccess: () => {
      toast.success("You added restaurant successfully!");
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onPriceRangeChange = (value: string) => {
    setPriceRange(value);
  };

  const onResetFields = () => {
    setName("");
    setLocation("");
    setPriceRange("");
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ name, location, price_range: priceRange.length });
    onResetFields();
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex gap-4 justify-center items-end"
    >
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
      <Button disabled={isPending} type="submit">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
      </Button>
    </form>
  );
};
