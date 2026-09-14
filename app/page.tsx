import Navbar from "./components/Navbar";
import Hero from "./components/Home/Hero";
import WhatWeOffer from "./components/WhatWeOffer";
import HowItWorks from "./components/Home/HowItWorks";
import PopularSubjects from "./components/Home/PopularSubjects";
import ForTeachers from "./components/Home/ForTeachers";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatWeOffer />
      <HowItWorks />
      <PopularSubjects />
      <ForTeachers />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}