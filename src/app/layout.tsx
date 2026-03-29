import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITM SFT SummerHacks '26",
  description: "A 24-hour startup hackathon where innovators, developers, and creators build groundbreaking solutions. Join hundreds of participants in an intense, collaborative environment powered by creativity and code.",
  keywords: ["hackathon", "startup", "coding", "innovation", "summer hacks", "ITM", "SFT"],
  authors: [{ name: "SummerHacks '26" }],
  creator: "SummerHacks '26",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://summerhacks.com",
    title: "ITM SFT SummerHacks '26",
    description: "A 24-hour startup hackathon where innovators build groundbreaking solutions.",
    siteName: "SummerHacks '26",
    images: [
      {
        url: "/poster.jpeg",
        width: 1200,
        height: 630,
        alt: "SummerHacks '26",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITM SFT SummerHacks '26",
    description: "A 24-hour startup hackathon. Join us for innovation, creativity, and code.",
    images: ["/poster.jpeg"],
    creator: "@SummerHacks26",
  },
  icons: {
    icon: "/logo.jpeg",
  },
  themeColor: "#F5C518",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'gJe5k1ppY_wmVblxoJrcEvd6_I6gM5-0zoClWPjyRBg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} ${shareTechMono.variable} antialiased`}
      >
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
        <Script
          id="luma-checkout"
          src="https://embed.lu.ma/checkout-button.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
