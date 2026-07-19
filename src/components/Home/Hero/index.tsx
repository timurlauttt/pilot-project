import Image from "next/image";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { getBlockByKey, getSiteSettings, toWhatsAppLink } from "@/lib/content";

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.766.46 3.492 1.334 5.012L2 22l5.116-1.317A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.09a8.06 8.06 0 0 1-4.11-1.12l-.294-.174-3.036.782.81-2.96-.192-.304A8.09 8.09 0 1 1 20.09 12c0 4.465-3.63 8.09-8.086 8.09z" />
        </svg>
    );
}

const Hero = async () => {
    const [data, settings] = await Promise.all([getBlockByKey("hero-main"), getSiteSettings()]);

    const title = data?.title || "Perawatan Kecantikan Terpercaya";
    const subtitle = data?.subtitle || "Klinik Kecantikan";
    const description =
        data?.description ||
        "Konsultasikan kebutuhan perawatan kulit dan kecantikan Anda bersama dokter berpengalaman kami.";
    const ctaLabel = data?.ctaLabel || "Booking Sekarang";
    const ctaLink = data?.ctaLink || "/contact";
    const waLink = toWhatsAppLink(settings?.whatsappNumber, "Halo, saya ingin konsultasi perawatan kecantikan.");
    const heroImage = data?.imageUrl || "/images/hero/john.png";

    return (
        <section className="pt-32 dark:bg-darkmode">
            <div className="container">
                <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-30">
                    <div className="col-span-6">
                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                            className="relative z-0  inline-block text-primary text-lg font-bold before:absolute before:content-[''] before:bg-primary/20  before:w-full before:h-2 before:-z-1 dark:before:-z-1 before:bottom-0"
                        >
                            {subtitle}
                        </p>
                        <h1
                            className="py-4"
                            data-aos="fade-up"
                            data-aos-delay="300"
                            data-aos-duration="1000"
                        >
                            {title}
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            data-aos-duration="1000"
                            className="text-xl text-SlateBlueText dark:text-opacity-80 font-normal md:pb-14 pb-6"
                        >
                            {description}
                        </p>
                        <div className="flex items-center justify-start flex-wrap gap-4">
                            <Link
                                href={ctaLink}
                                data-aos="fade-up"
                                data-aos-delay="500"
                                data-aos-duration="1000"
                                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden"
                            >
                                <span className="!flex !items-center gap-14">
                                    <CalendarCheck className="w-5 h-5 shrink-0" />
                                    {ctaLabel}
                                </span>
                            </Link>
                            {waLink && (
                                <Link
                                    href={waLink}
                                    target="_blank"
                                    data-aos="fade-up"
                                    data-aos-delay="600"
                                    data-aos-duration="1000"
                                    className="btn_outline btn-2 hover-outline-slide-down group"
                                >
                                    <span className="!flex !items-center gap-14">
                                        <WhatsAppIcon />
                                        Chat via WhatsApp
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                        className="col-span-6 lg:block hidden"
                    >
                        <div className="bg-ElectricAqua relative rounded-tl-166 rounded-br-166 w-full">
                            <Image
                                src={heroImage}
                                alt={title}
                                width={0}
                                height={0}
                                quality={100}
                                layout="responsive"
                                sizes="100vh"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
