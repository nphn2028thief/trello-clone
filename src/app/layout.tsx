import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";

import siteConfig from "@/configs/site";
import QueryClientProvider from "./QueryClientProvider";
import { LoadingProvider } from "@/context/Loading";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <LoadingProvider>
            <ClerkProvider>
              {children}
              <ToastContainer autoClose={2000} />
            </ClerkProvider>
          </LoadingProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
