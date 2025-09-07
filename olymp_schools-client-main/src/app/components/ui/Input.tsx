import { ComponentProps } from "react";
import { fadeUp } from "../animations/fadeUp";
import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../stores/themeStore";

function Input(props: ComponentProps<"input">) {
  const { isDarkMode } = useThemeStore();

  return (
    // @ts-ignore
    <m.input
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      {...props}
      className={cn(
        "rounded-lg border-solid border-blue-500 px-6 py-2 text-lg outline-2 outline-offset-2 outline-blue-500 outline-solid",
        {
          "placeholder-gray-400": isDarkMode,
          "bg-blue-200/55 placeholder-gray-500": !isDarkMode,
        },
      )}
    />
  );
}

export default Input;
