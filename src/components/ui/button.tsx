import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "solid" | "outline";
}

export function Button({ asChild, variant = "solid", className = "", children, ...props }: ButtonProps) {
  const base =
    "rounded-2xl px-4 py-2 text-sm font-medium transition-colors duration-200 active:scale-[.98]";
  const solid = "bg-[#1b2a4a] hover:bg-[#16233d] text-white shadow-sm";
  const outline = "border border-[#1b2a4a] text-[#1b2a4a] hover:bg-[#e9f1ff]";

  const styles = `${base} ${variant === "outline" ? outline : solid} ${className}`;

  if (asChild) {
    return <span className={styles}>{children}</span>;
  }
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
