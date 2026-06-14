import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { company } from "@insucare/domain";
import { FloatingActions } from "../components/floating-actions";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.insucareindia.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.displayName} | Insurance Broking & Risk Advisory`,
    template: `%s | ${company.displayName}`
  },
  description:
    "IRDAI registered insurance broking solutions for individuals, families, SMEs, startups and enterprises in India.",
  openGraph: {
    title: `${company.displayName} | Protecting What Matters Most`,
    description: "Trusted insurance broking, risk advisory and claims assistance.",
    url: siteUrl,
    siteName: company.displayName,
    images: ["/brand/insucare-logo.jpeg"],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.displayName} Insurance Broking`,
    description: "Transparent insurance advisory and claims support."
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-ink text-ink dark:text-porcelain transition-colors duration-300 overflow-x-clip" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
