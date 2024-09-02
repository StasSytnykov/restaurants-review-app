import { ChangeEvent, useState } from "react";

export const useHandleBasicDataOfRestaurant = () => {
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

  const onResetFields = () => {
    setName("");
    setLocation("");
    setPriceRange("");
  };

  return {
    name,
    location,
    priceRange,
    onNameChange,
    onLocationChange,
    onPriceRangeChange,
    onResetFields,
  };
};
