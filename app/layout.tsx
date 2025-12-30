import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aldy Prastyo - Portfolio",
  description: "Portfolio of Aldy Prastyo (Dipras), a Full-Stack Developer and Low-Level Enthusiast. Specializing in C, Linux, PHP, React Native, and modern web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} bg-background-light text-text-main font-display overflow-x-hidden antialiased selection:bg-primary/20 selection:text-primary`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
