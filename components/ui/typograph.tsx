import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

type Props = {
  variant: "Header" | "Sub-Header" | "Text";
  children?: ReactNode;
  className?: string;
};

const TextVariant = cva("scroll-m-20 tracking-tight", {
  variants: {
    variant: {
      Header: "text-3xl font-semibold ",
      "Sub-Header": ` text-xl font-semibold ${raleway.className}`,
      Text: `leading-7  font-normal `,
    },
  },
  defaultVariants: {
    variant: "Text",
  },
});

const TextComp = {
  Header: "h1",
  "Sub-Header": "h5",
  Text: "p",
};
const Typograph = ({ variant, children, className }: Props) => {
  const Comp = TextComp[variant] as keyof JSX.IntrinsicElements;
  return (
    <Comp className={cn(TextVariant({ variant, className }))}>{children}</Comp>
  );
};

export default Typograph;
