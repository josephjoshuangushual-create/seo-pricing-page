// src/components/ui/badge.jsx
export function Badge({ className = "", children }) {
  return (
    <span
      className={
        `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
         border shadow-sm ${className}`
      }
    >
      {children}
    </span>
  );
}
