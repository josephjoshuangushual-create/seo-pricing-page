import * as React from "react";

export function Card({ children, className = "" }) {
  return <div className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow ${className}`}>{children}</div>;
}
export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
export default Card;
