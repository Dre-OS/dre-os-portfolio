import type { Metadata } from "next";
import { jostSans, geistMono } from "./fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "Dre_OS Portfolio",
  description: "A Portfolio Site by Hendre Leigh Sagabaen (Dre_OS)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jostSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
