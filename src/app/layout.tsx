import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Twitter clone for learning purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
