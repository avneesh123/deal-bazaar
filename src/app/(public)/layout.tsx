import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="paper-grain min-h-screen bg-paper text-ink">
      <AnnouncementBar />
      <Navbar />
      <main className="relative z-10 pt-[5.25rem] md:pt-[5.75rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
