import type { Metadata } from "next";
import { Jost, Gilda_Display } from "next/font/google";
import "./globals.css";

const jost = Jost({ 
  subsets: ["latin"],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

const gildaDisplay = Gilda_Display({ 
  subsets: ["latin"],
  variable: '--font-gilda',
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Signature Int'l Hotel Royal Ltd - Premium Accommodation",
  description: "Experience world-class hospitality with premium accommodations. From Signature Superior to Business Class rooms, we offer exceptional service for discerning guests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${gildaDisplay.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
