import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI DJ PRO - The Future of DJing",
  description: "Professional AI-powered mixing and performance automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#050505] text-white`}>
        <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-center">
          <img
            src="/logo.png"
            alt="AI DJ PRO"
            className="h-8 w-auto object-contain"
          />
        </header>
        {children}
      </body>
    </html>
  );
}
