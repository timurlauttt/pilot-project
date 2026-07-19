import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlocksByType } from "@/lib/content";

const Upcoming = async () => {
  const promos = await getBlocksByType("promo");

  if (promos.length === 0) return null;

  return (
    <>
      <section className="upcoming dark:bg-darkmode">
        <div className="max-w-1068 m-auto">
          <div className="container">
            <h2 data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" className="text-center pb-10">Promo Berjalan</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {promos.map((promo, index) => (
                <div
                  key={promo.id}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 200}`}
                  data-aos-duration="1000"
                  className="flex items-center gap-5 border border-solid dark:border-dark_border rounded-22 p-6"
                >
                  {promo.imageUrl && (
                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={promo.imageUrl}
                        alt={promo.title || "Promo"}
                        width={0}
                        height={0}
                        quality={100}
                        layout="responsive"
                        sizes="100vh"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h6 className="text-xl font-bold text-secondary dark:text-white">
                      {promo.title}
                    </h6>
                    {promo.description && (
                      <p className="text-sm text-SlateBlueText dark:text-opacity-80 pt-2 pb-4">
                        {promo.description}
                      </p>
                    )}
                    {promo.ctaLabel && (
                      <Link
                        href={promo.ctaLink || "/contact"}
                        className="btn_outline btn-2 hover-outline-slide-down"
                      >
                        <span>{promo.ctaLabel}</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Upcoming;
