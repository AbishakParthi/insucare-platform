import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { company } from "@insucare/domain";
import { GoogleAnalytics } from "@next/third-parties/google";
import { FloatingActions } from "../components/floating-actions";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-provider";
import { SkipToContent } from "../components/skip-to-content";
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

const siteUrl = "https://insucare-platform-web.vercel.app";
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? "xxxxxxxxx";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.displayName} | Insurance Broking & Risk Advisory`,
    template: `%s | ${company.displayName}`
  },
  description:
    "IRDAI registered insurance broking solutions for individuals, families, SMEs, startups and enterprises in India.",
  keywords: ["Insurance Broking", "Risk Advisory", "Health Insurance", "Life Insurance", "Motor Insurance", "India", "Corporate Insurance", "Claims Assistance"],
  authors: [{ name: company.displayName, url: siteUrl }],
  creator: company.displayName,
  publisher: company.displayName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  },
  verification: {
    google: "google-site-verification-placeholder", // Replace with actual GSC code
  },
  alternates: {
    canonical: siteUrl,
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: company.displayName,
  url: siteUrl,
  logo: `${siteUrl}/brand/insucare-logo.jpeg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9999999999", // Update from company domain if available
    contactType: "customer service"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.displayName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-ink text-ink dark:text-porcelain transition-colors duration-300 overflow-x-clip" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipToContent />
          <Header />
          <main id="main-content" className="overflow-x-hidden min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </ThemeProvider>
        
        {/* Analytics */}
        <GoogleAnalytics gaId={gaId} />
        
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />

        {/* Global Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
