"use client";

import { useState } from "react";
import Image from "next/image";
import type { ContentBlock } from "@/db/schema";

export function DoctorGrid({ doctors }: { doctors: ContentBlock[] }) {
    const [selected, setSelected] = useState<ContentBlock | null>(null);

    return (
        <>
            <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 items-stretch gap-8 mx-7">
                {doctors.map((doctor, index) => (
                    <button
                        key={doctor.id}
                        type="button"
                        onClick={() => setSelected(doctor)}
                        data-aos="fade-up"
                        data-aos-delay={`${index * 300}`}
                        data-aos-duration="1000"
                        className={`col-span-1 group overflow-hidden text-left cursor-pointer ${
                            index % 2 === 1 ? "lg:mt-28 mt-0" : ""
                        }`}
                    >
                        <div className="relative aspect-square overflow-hidden rounded-xl">
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
                    </button>
                ))}
            </div>

            {selected && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative bg-white dark:bg-darkmode rounded-22 shadow-hero-box max-w-md w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            aria-label="Tutup"
                            className="absolute top-4 right-4 z-10 bg-white dark:bg-darklight w-9 h-9 rounded-full flex items-center justify-center shadow-hero-box hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="dark:text-white">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="relative aspect-square w-full">
                            <Image
                                src={selected.imageUrl || "/images/world-class-speakers/speakers_1.png"}
                                alt={selected.title || "Dokter"}
                                fill
                                quality={100}
                                sizes="448px"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h6 className="text-2xl font-bold text-secondary dark:text-white">
                                {selected.title}
                            </h6>
                            <p className="text-base font-medium text-primary pb-4">{selected.subtitle}</p>
                            {selected.description && (
                                <p className="text-SlateBlueText dark:text-opacity-80 text-base">
                                    {selected.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
