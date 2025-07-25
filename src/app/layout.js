import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNav from "./NavBar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-blue-50 dark:bg-black ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Responsive Header */}
        <div className="w-full px-4  flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md bg-blue-50 dark:bg-black sticky top-0 z-10">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-blue-700 dark:text-blue-50 pt-1">
            Personal Finance Tracker
          </h1>
          <MainNav/>
        </div>
        {children}
      </body>
    </html>
  );
}
