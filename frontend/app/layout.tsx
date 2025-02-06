import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./store/Provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        <div>
          <Toaster />
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
