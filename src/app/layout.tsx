import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContextCollab - Shareable Briefings for Teams",
  description: "Capture browser sessions and create AI-powered context briefings for async team handoffs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}