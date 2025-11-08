import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="relative bg-background text-foreground app-bg">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}