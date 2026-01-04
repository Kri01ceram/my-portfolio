"use client";

// Page now composed entirely of extracted section components.
import Hero from "@/components/hero";
import ExperienceSection from "@/components/experience-section";
import ProjectsOverview from "@/components/projects-overview";
import EducationSection from "@/components/education-section";
import ContactSection from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <ProjectsOverview />
      <EducationSection />
      <ContactSection />
    </>
  );
}