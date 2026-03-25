import Hero from "@/components/Hero";
import About from "@/components/About";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Prizes from "@/components/Prizes";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <About />
      <Tracks />
      <Schedule />
      <Speakers />
      <Prizes />
      <Sponsors />
      <FAQ />
      <Footer />
    </main>
  );
}
