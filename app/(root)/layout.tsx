import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
