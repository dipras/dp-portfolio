import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DiscordPresenceProvider } from "@/components/DiscordPresence";
import PageTransition from "@/components/motion/PageTransition";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const materialSymbolsUrl = new URL("https://fonts.googleapis.com/css2");
materialSymbolsUrl.searchParams.set("family", "Material Symbols Outlined");
materialSymbolsUrl.searchParams.set(
  "icon_names",
  [
    "arrow_back",
    "arrow_forward",
    "arrow_outward",
    "arrow_right_alt",
    "chat",
    "close",
    "code",
    "commit",
    "data_object",
    "dns",
    "download",
    "edit_note",
    "javascript",
    "layers",
    "mail",
    "memory",
    "menu",
    "new_releases",
    "php",
    "public",
    "school",
    "send",
    "smartphone",
    "tag",
    "terminal",
    "work",
    "work_history",
  ].join(","),
);
materialSymbolsUrl.searchParams.set("display", "block");

export const metadata: Metadata = {
  metadataBase: new URL("https://dipras.my.id"),
  title: {
    default: "Aldy Prastyo - Portfolio",
    template: "%s | Aldy Prastyo",
  },
  description: "Portfolio of Aldy Prastyo (Dipras), a Full-Stack Developer and Low-Level Enthusiast. Specializing in C, Linux, PHP, React Native, and modern web development.",
  openGraph: {
    siteName: "Aldy Prastyo - Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href={materialSymbolsUrl.toString()} rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} bg-background-light text-text-main font-display overflow-x-hidden antialiased selection:bg-primary/20 selection:text-primary`}>
        <DiscordPresenceProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </DiscordPresenceProvider>
      </body>
    </html>
  );
}
