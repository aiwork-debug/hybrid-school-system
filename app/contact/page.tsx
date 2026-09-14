import Navbar from "@/app/components/Navbar";
import ContactSection from "@/app/components/Contact/ContactSection";
import Footer from "@/app/components/Footer";
import ContactHero from "../components/Contact/ContactHero";
import FinalCTA from "../components/FinalCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ContactHero />
      <ContactSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}