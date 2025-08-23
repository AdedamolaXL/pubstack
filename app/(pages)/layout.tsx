import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CardContext";
import "@/app/globals.css"; 
import { ClientProviders } from "@/app/providers/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Pubstack",
  description: "Gasless USDC payments",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-white text-dune-900 antialiased">
        <ClientProviders>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </CartProvider>      
        </ClientProviders>
      </body>
    </html>
  );
}