import type { Metadata } from "next";
import { Fredoka, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "600"],
  variable: "--font-accent",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Hybrid School System",
  description: "Online hybrid learning platform — live classes and recorded lectures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${playfair.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}