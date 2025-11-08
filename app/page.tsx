"use client";

// Page now composed entirely of extracted section components.
import Hero from "@/components/hero";
import ProjectsOverview from "@/components/projects-overview";
import JourneySection from "@/components/journey-section";
import TechStackSection from "@/components/tech-stack";
import AchievementsSection from "@/components/achievements-section";
import ContactSection from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsOverview />
      <JourneySection />
      <TechStackSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}