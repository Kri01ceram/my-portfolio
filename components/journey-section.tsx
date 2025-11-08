"use client";

import Section from "@/components/section";
import CareerTrain from "@/components/career-train";

export default function JourneySection() {
  return (
    <Section id="journey" title="Career Journey" subtitle="Ride through milestones from past to present">
      <div className="mt-4 md:mt-6">
        <CareerTrain />
      </div>
    </Section>
  );
}
