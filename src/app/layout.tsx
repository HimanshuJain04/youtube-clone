import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContext } from "@/app/context";
import { dark } from "@clerk/themes";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body>
          <AppContext>
            <div className="w-full min-h-screen bg-black">
              <Navbar />
              <>{children}</>
            </div>
          </AppContext>
        </body>
      </html>
    </ClerkProvider>
  );
}
