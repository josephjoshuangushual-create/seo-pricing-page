import "./globals.css";

export const metadata = {
  title: "SEO Pricing",
  description: "SEO pricing landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        {children}
      </body>
    </html>
  );
}
