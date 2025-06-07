import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Sonner } from "../components/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, Vote and Grew",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Sonner />
      </body>
    </html>
  );
}
