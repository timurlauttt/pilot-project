import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import TicketSection from "@/components/Home/TicketSection";
import { getBlocksByType } from "@/lib/content";

export const metadata: Metadata = {
    title: "Semua Layanan | Klinik Kecantikan",
};

function formatRupiah(price: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
        price
    );
}

const LayananPage = async () => {
    const services = await getBlocksByType("service");
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/layanan", text: "Layanan" },
    ];

    return (
        <>
            <HeroSub
                title="Semua Layanan Kami"
                description="Berbagai perawatan kecantikan dan kesehatan kulit dengan teknologi terkini, ditangani langsung oleh dokter dan terapis berpengalaman."
                breadcrumbLinks={breadcrumbLinks}
            />
            <section className="dark:bg-darkmode">
                <div className="container">
                    {services.length === 0 ? (
                        <p className="text-center text-SlateBlueText">
                            Daftar layanan akan segera hadir.
                        </p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    data-aos="fade-up"
                                    data-aos-delay={`${(index % 3) * 200}`}
                                    data-aos-duration="1000"
                                    className="border border-solid border-border dark:border-dark_border rounded-22 overflow-hidden"
                                >
                                    {service.imageUrl && (
                                        <div className="relative aspect-[4/3] rounded-tl-[2.5rem] overflow-hidden">
                                            <Image
                                                src={service.imageUrl}
                                                alt={service.title || "Layanan"}
                                                fill
                                                quality={100}
                                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h6 className="text-xl font-bold text-secondary dark:text-white pb-2">
                                            {service.title}
                                        </h6>
                                        {service.description && (
                                            <p className="text-sm text-SlateBlueText dark:text-opacity-80 pb-4">
                                                {service.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            {service.price != null && (
                                                <span className="text-lg font-bold text-primary">
                                                    {formatRupiah(service.price)}
                                                </span>
                                            )}
                                            <Link
                                                href="/contact"
                                                className="btn_outline btn-2 hover-outline-slide-down"
                                            >
                                                <span>Booking</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <TicketSection />
        </>
    );
};

export default LayananPage;
