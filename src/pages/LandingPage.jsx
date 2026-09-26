import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import ProblemSolution from "../components/landing/ProblemSolution";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import ProductRoadmap from "../components/landing/ProductRoadmap";
import FinalCta from "../components/landing/FinalCta";
import { useReveal } from "../hooks/useReveal";

export default function LandingPage() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <ProductRoadmap />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
