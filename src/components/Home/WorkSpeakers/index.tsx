import React from "react";
import Image from "next/image";
import { getBlocksByType } from "@/lib/content";

const WorkSpeakers = async ({ showTitle = true }: { showTitle?: boolean }) => {
  const doctors = await getBlocksByType("doctor");

  if (doctors.length === 0) return null;

  return (
    <>
      <section className="dark:bg-darkmode">
        {showTitle && (
          <h2 className="text-center pb-12">Tim Dokter &amp; Terapis Kami</h2>
        )}
        <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 items-stretch gap-8 mx-7">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`}
              data-aos-duration="1000"
              className={`col-span-1 group overflow-hidden ${
                index % 2 === 1 ? "lg:mt-28 mt-0" : ""
              }`}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={doctor.imageUrl || "/images/world-class-speakers/speakers_1.png"}
                  alt={doctor.title || "Dokter"}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-all duration-0.4s group-hover:scale-110"
                />
              </div>
              <div className="pt-6">
                <h6 className="text-[28px] leading-[2.25rem] font-bold text-secondary dark:text-white">
                  {doctor.title}
                </h6>
                <span className="text-lg font-normal text-SlateBlueText dark:text-opacity-80">
                  {doctor.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WorkSpeakers;
