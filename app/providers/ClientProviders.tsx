"use client";
import { W3sProvider } from "./W3sProvider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <W3sProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
            {children}
          </div>
        </W3sProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
