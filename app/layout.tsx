import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CivicAuthProvider } from "@civic/auth/nextjs";
import { Providers } from "./providers";
import { Chatbot } from "@/components/ui/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EarnX - Web3 Freelance, Gigs & Bounties",
  description:
    "EarnX is a Web3-native marketplace for freelancers to find on-chain gigs, bounties, and projects—escrow-protected payouts, global clients, and programmable trust in a $1.5T freelance economy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <CivicAuthProvider>
            {children}
            <Chatbot />
          </CivicAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
