import React from "react";
import Link from "next/link";
import { getBlocksByType } from "@/lib/content";
import type { ContentBlock } from "@/db/schema";

function formatRupiah(price: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
        price
    );
}

function PriceList({ title, items }: { title: string; items: ContentBlock[] }) {
    return (
        <div className="bg-white dark:bg-darklight rounded-22 lg:px-11 px-4 pt-8 pb-10 h-full">
            <h6 className="text-[26px] leading-[2.1rem] font-bold text-secondary dark:text-white pb-5">
                {title}
            </h6>
            <div className="space-y-4">
                {items.length > 0 ? (
                    items.map((service) => (
                        <div key={service.id} className="flex flex-wrap items-center md:gap-30 gap-2">
                            <span className="text-[22px] leading-[2rem] font-bold text-secondary dark:text-white">
                                {formatRupiah(service.price as number)}
                            </span>
                            <p className="text-xl font-normal text-secondary dark:text-darktext">
                                {service.title}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-SlateBlueText">
                        Daftar harga treatment akan segera hadir.
                    </p>
                )}
                <Link
                    href="/contact"
                    className="btn btn-1 hover-filled-slide-down w-full text-center rounded-lg overflow-hidden"
                >
                    <span>Booking Sekarang</span>
                </Link>
            </div>
        </div>
    );
}

const EventTicket = async () => {
    const services = await getBlocksByType("service");
    const withPrice = services.filter((service) => service.price != null);
    const featured = withPrice.slice(0, 2);
    const others = withPrice.slice(2, 4);

    return (
        <>
            <section className="pt-16 dark:bg-darkmode">
                <div className="container">
                    <div className="text-center md:pb-20 pb-8">
                        <h2 className="pb-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">Paket Treatment Pilihan</h2>
                        <p data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="text-SlateBlueText dark:text-opacity-80 text-lg font-normal max-w-920 m-auto">
                            Perawatan terbaik kami dengan harga transparan, tanpa biaya tersembunyi.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-stretch" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                        <div className="bg-primary flex items-center justify-center lg:px-16 px-8 lg:py-14 py-6 lg:rounded-l-22 rounded-t-22 md:rounded-tr-none md:rounded-bl-22 rounded-bl-none md:w-2/4 w-full">
                            <PriceList title="Paket Lainnya" items={others} />
                        </div>
                        <div className="bg-ElectricAqua lg:py-14 py-6 lg:px-16 px-8 lg:rounded-r-22 rounded-b-22 md:rounded-bl-none md:rounded-tr-22 rounded-tr-none md:md:w-2/4 w-full">
                            <PriceList title="Harga Treatment" items={featured} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EventTicket;
