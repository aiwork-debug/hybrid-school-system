import Navbar from "@/app/components/Navbar";
import AboutHero from "@/app/components/About/AboutHero";
import OurStory from "@/app/components/About/OurStory";
import FinalCTA from "@/app/components/FinalCTA";
import Footer from "@/app/components/Footer";
import FAQ from "../components/FAQ";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero />
      <OurStory />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}