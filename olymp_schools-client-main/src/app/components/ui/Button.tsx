import { forwardRef } from "react";
import { m } from "framer-motion";
import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { clsx } from "clsx";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({ size = "md", className, children, ...rest }, ref) => {
  const base =
    "rounded-lg cursor-pointer bg-gradient-to-r from-blue-600 max-w-lg to-blue-500 text-white hover:from-blue-500 hover:to-blue-600";

  const sizeMap: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    // @ts-ignore
    <m.button
      ref={ref}
      className={clsx(base, sizeMap[size], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      {...rest}
    >
      {children}
    </m.button>
  );
});

Button.displayName = "Button";
