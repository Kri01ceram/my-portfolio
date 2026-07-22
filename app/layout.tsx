import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollIndicator from "@/components/scroll-indicator";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: ["Krishna Singh", "Portfolio", "Full-stack", "ML", "Data Analyst", "Next.js"],
  creator: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: `${site.name} Portfolio`,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/twitter-image"],
  },
  robots: { index: true, follow: true },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="relative bg-background text-foreground app-bg">
        <Header />
        <ScrollIndicator
          sections={[
            { id: "home", label: "Home" },
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Projects" },
            { id: "education", label: "Education" },
            { id: "contact", label: "Contact" },
          ]}
        />
        <main className="min-h-screen pt-[64px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}