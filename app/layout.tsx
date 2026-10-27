import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import logo from "../lib/icon.jpg";

import Footer from "../components/footer";
import Navbar from "@/components/navbar2";
import { CartProvider } from "@/components/context/CartContext";
import SideCart from "@/components/SideCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskco | E-commerce Cosmatics Store",
  description: "E-commerce cosmatics store",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Wrap CartProvider around everything that needs access to the cart */}
        <CartProvider>
          <Navbar />
          {children}
          <SideCart />
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}