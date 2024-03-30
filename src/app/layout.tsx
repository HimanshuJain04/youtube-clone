import type { Metadata } from "next";
import { AppContext } from "@/app/context";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: "Youtube",
  description: "Youtube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContext>
          <div className="w-full min-h-[calc(100vh-100px)] bg-black">
            <Navbar />
            <>{children}</>
          </div>
        </AppContext>
        <Toaster />
      </body>
    </html>
  );
}
