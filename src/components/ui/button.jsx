// src/components/ui/button.tsx
import * as React from "react";

type Variant = "default" | "outline";
type Size = "sm" | "md" | "lg";

export type ButtonProps = {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center rounded-2xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  default: "bg-[#1b2a4a] text-white hover:bg-[#16233d]",
  outline: "border border-[#1b2a4a] text-[#1b2a4a] hover:bg-[#e9f1ff]",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({
  asChild,
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = [base, variants[variant], sizes[size], className].join(" ");

  // When asChild is true, we clone the child (e.g. <a>) and apply button classes
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      className: [cls, (children as any).props?.className || ""].join(" "),
      ...props,
    });
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
