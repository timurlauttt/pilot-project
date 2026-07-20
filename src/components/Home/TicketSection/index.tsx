import React from "react";
import Link from "next/link";
import { getSiteSettings, toWhatsAppLink } from "@/lib/content";

const TicketSection = async () => {
  const settings = await getSiteSettings();
  const waLink = toWhatsAppLink(
    settings?.whatsappNumber,
    "Halo, saya ingin booking treatment.",
  );

  return (
    <>
      <section className="dark:bg-darkmode pt-0">
        <div className="container">
          <div className="bg-primary relative md:mx-auto mx-0 overflow-hidden py-0 rounded-22 lg:-mb-48 dark:lg:-mb-48 md:mt-20 mt-10">
            <div className="flex flex-col items-center justify-center text-center md:p-20 p-10">
              <p className="sm:text-4xl text-[28px] leading-[2.25rem] font-bold text-white max-w-632 pb-4">
                Mulai Perjalanan Menuju Kulit Sehat Anda Hari Ini!{" "}
              </p>
              <p className="text-lg font-normal text-white text-opacity-80 max-w-506 pb-9">
                Jangan tunda lagi. Jadwalkan konsultasi gratis Anda bersama
                ahlinya sekarang dan temukan solusi terbaik untuk kulit Anda.
              </p>
              <Link
                href={waLink || "/contact"}
                target={waLink ? "_blank" : undefined}
                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden before:bg-ElectricAqua"
              >
                <span className="sm:!px-20 px-10 !border-ElectricAqua !text-white">
                  Booking Sekarang
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketSection;
