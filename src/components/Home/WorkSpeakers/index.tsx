import React from "react";
import { getBlocksByType } from "@/lib/content";
import { DoctorGrid } from "./DoctorGrid";

const WorkSpeakers = async ({ showTitle = true }: { showTitle?: boolean }) => {
  const doctors = await getBlocksByType("doctor");

  if (doctors.length === 0) return null;

  return (
    <>
      <section className="dark:bg-darkmode">
        {showTitle && (
          <h2 className="text-center pb-12">Tim Dokter &amp; Terapis Kami</h2>
        )}
        <DoctorGrid doctors={doctors} />
      </section>
    </>
  );
};

export default WorkSpeakers;
