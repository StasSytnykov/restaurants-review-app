import { InputWithLabel } from "@/InputWithLabel";

export const NewRestaurantPanel = () => {
  return (
    <form>
      <InputWithLabel name="Name" type="name" />
      <InputWithLabel name="location" type="location" />
      {/*<InputWithLabel name="location" type="location"/>*/}
    </form>
  );
};
