import Hero from "@/components/Hero";
import About from "@/components/About";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Prizes from "@/components/Prizes";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { getMentors, getJudges, getPartners } from "@/lib/queries";
import { REVEAL_TIME } from "@/lib/config";

export const revalidate = 60;

export default async function Home() {
  const isRevealed = new Date() >= REVEAL_TIME;

  const [mentorsResult, judgesResult, partnersResult] = await Promise.allSettled([
    getMentors(),
    getJudges(),
    getPartners(),
  ]);

  const mentors = mentorsResult.status === 'fulfilled' ? mentorsResult.value : [];
  const judges = judgesResult.status === 'fulfilled' ? judgesResult.value : [];
  const partners = partnersResult.status === 'fulfilled' ? partnersResult.value : [];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <About />
      <Tracks isRevealed={isRevealed} />
      <Schedule />
      <Speakers judges={judges} mentors={mentors} />
      <Prizes />
      <Sponsors sponsors={partners} />
      <FAQ />
      <Footer />
    </main>
  );
}
