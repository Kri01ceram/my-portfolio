import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Global3DBackground from "@/components/global-3d-bg";

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
  <body className={`relative ${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          {/* Global 3D background (masked, non-interactive) */}
          <div className="pointer-events-none fixed inset-0 -z-10">
            <Global3DBackground className="w-full h-full opacity-90 [mask-image:radial-gradient(85%_85%_at_50%_50%,_black_65%,_transparent_98%)]" />
          </div>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}