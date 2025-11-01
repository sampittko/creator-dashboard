import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <body
        className={`${spaceGrotesk.className} antialiased bg-[#F4F4F4] text-[#333] transition-colors duration-300 dark:bg-[#333] dark:text-[#F4F4F4]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
