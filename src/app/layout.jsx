// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "SEO Pricing",
  description: "SEO pricing landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      {/* Dark-friendly defaults so sections render correctly even before their own backgrounds load */}
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        {children}
      </body>
