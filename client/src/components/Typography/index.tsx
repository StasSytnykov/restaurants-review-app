interface TypographyProps {
  name: string;
}

export const TypographyH1 = ({ name }: TypographyProps) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {name}
    </h1>
  );
};
