import * as React from "react";

export function Badge({ children, className = "" }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-slate-800 text-white shadow-sm ${className}`}>{children}</span>;
}
export default Badge;
