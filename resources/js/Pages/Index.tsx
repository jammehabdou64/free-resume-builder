import { Head } from "@inertiajs/react";

import Header from "@/Components/Header";
import { Footer } from "@/Components/landing/footer";
import { CTA } from "@/Components/landing/cta";
import { Testimonials } from "@/Components/landing/testimonials";
import { TemplatesShowcase } from "@/Components/landing/templates-showcase";
import { HowItWorks } from "@/Components/landing/how-it-works";
import { Features } from "@/Components/landing/features";
import { Hero } from "@/Components/landing/hero";
const Home = () => {
  return (
    <>
      <Head title="Welcome" />
      <Header />
      <div className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <TemplatesShowcase />
        <Testimonials />
        {/* <Pricing /> */}
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default Home;
