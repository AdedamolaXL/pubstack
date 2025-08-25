import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CardContext";
import "@/app/globals.css"; 
import { ClientProviders } from "@/app/providers/ClientProviders";
import Header from '../components/Header';
import CartDrawer from "../components/Ebooks/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "PubStack | Author Platform with Crypto Payments",
  description: "Web2-like experience with gasless USDC payments for authors and creators",
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
       
              <main className="flex-1">
                {children}
                 <CartDrawer />
              </main>
            </div>
          </CartProvider>      
        </ClientProviders>
      </body>
    </html>
  );
}