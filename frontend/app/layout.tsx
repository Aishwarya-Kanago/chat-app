import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./store/Provider";

const poppins = Poppins({
  variable: "--font-poppins", // Define a CSS variable
  subsets: ["latin"], // Load only Latin subset to optimize performance
  weight: ["300", "400", "500", "600", "700"], // Choose font weights you need
});

export const metadata: Metadata = {
  title: "Chat-app",
  description: "Chat-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>
          <Navbar />
          <Toaster />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
