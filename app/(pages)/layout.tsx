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
  title: "CryptoCommerce | Gasless USDC Payments",
  description: "Web2-like checkout experience with gasless USDC payments",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 antialiased">
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