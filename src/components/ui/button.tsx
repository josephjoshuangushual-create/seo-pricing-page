import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "solid" | "outline";
  size?: "md" | "lg";
}

export function Button({
  asChild,
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "rounded-2xl font-medium transition-colors duration-200 active:scale-[.98]";
  const sizes = {
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };
  const solid = "bg-[#1b2a4a] hover:bg-[#16233d] text-white shadow-sm";
  const outline = "border border-[#1b2a4a] text-[#1b2a4a] hover:bg-[#e9f1ff]";

  const styles = `${base} ${sizes[size]} ${variant === "outline" ? outline : solid} ${className}`;

  if (asChild) return <span className={styles}>{children}</span>;
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
