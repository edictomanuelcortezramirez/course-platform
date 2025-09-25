import Head from "next/head";
import HeroSection from "../src/components/HeroSection";
import CourseCard from "../src/components/CourseCard";
import StepProcess from "../src/components/StepProcess";
import TestimonialsSection from "../src/components/TestimonialsSection";
import FaqSection from "../src/components/FaqSection";
import FinalCTA from "../src/components/FinalCTA";
import NavbarLayout from "../src/layouts/NavbarLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lunéa | Aprende lo que amas</title>
        <meta
          name="description"
          content="Lunéa es una plataforma donde puedes aprender, comprar cursos y resolver tus dudas."
        />
        <meta
          name="keywords"
          content="educación, cursos online, Lunéa, aprendizaje"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarLayout />
      <HeroSection />
      <CourseCard />
      <StepProcess />
      <TestimonialsSection />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
