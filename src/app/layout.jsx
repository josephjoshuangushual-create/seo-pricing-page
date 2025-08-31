// src/app/layout.jsx
export const metadata = {
  title: "SEO Pricing",
  description: "SEO pricing landing page",
};

// 👇 This is where we add the viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
