import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna Singh — Portfolio",
  description: "Full-stack developer & ML data analyst.",
  keywords: ["Krishna Singh", "Portfolio", "Full-stack", "ML", "Data Analyst", "Next.js"],
  creator: "Krishna Singh",
  openGraph: {
    title: "Krishna Singh — Portfolio",
    description: "Full-stack developer & ML data analyst.",
    url: "https://example.com",
    siteName: "Krishna Singh Portfolio",
    type: "website",
  },
  robots: { index: true, follow: true },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}