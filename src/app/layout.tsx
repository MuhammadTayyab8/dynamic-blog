import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RightMenu from "@/components/RightMenu";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CodesBlog",
  description: "A platform where developer share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-screen">
          {/* Navbar */}
          <Navbar />
          {/* Main Content Area */}
          <div className="grid grid-cols-[auto,1fr] h-[calc(100%-60px)]"> {/* Adjust the `60px` to match Navbar height */}
            {/* Sidebar */}
            <div className="bg-gray-800 h-full">
              <RightMenu />
            </div>
            <main className="pt-[65px] sm:ml-[200px] lg:pt-[65px] lg:ml-[200px] ml-0 p-4  bg-[#0E1217] text-white overflow-y-auto h-screen">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}
