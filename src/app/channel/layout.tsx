import SideBar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <>
          <Navbar />
          <div className="w-full flex bg-black">
            <SideBar />
            <>{children}</>
          </div>
        </>
      </body>
    </html>
  );
}
