import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getProjectsCount } from "@/lib/database/actions/project.actions";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const projectCount = await getProjectsCount();
  return (
    <div className=" h-screen flex flex-col ">
      <div className="
      sticky top-0 z-50  bg-white   backdrop-filter backdrop-blur-sm  bg-opacity-80
      ">

      <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer count={projectCount} />
    </div>
  );
}
