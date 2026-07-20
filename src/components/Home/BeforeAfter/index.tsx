import Image from "next/image";
import { getBlocksByType } from "@/lib/content";

const BeforeAfter = async () => {
    const items = await getBlocksByType("before_after");
    const withPhotos = items.filter((item) => item.imageUrl && item.secondaryImageUrl);

    if (withPhotos.length === 0) return null;

    return (
        <section className="dark:bg-darkmode">
            <div className="container">
                <div className="text-center md:pb-16 pb-8">
                    <h2 data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                        Sebelum &amp; Sesudah
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-duration="1000"
                        className="text-SlateBlueText dark:text-opacity-80 text-lg font-normal max-w-920 m-auto"
                    >
                        Lihat sendiri hasil nyata dari perawatan kami.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    {withPhotos.map((item, index) => (
                        <div
                            key={item.id}
                            data-aos="fade-up"
                            data-aos-delay={`${index * 200}`}
                            data-aos-duration="1000"
                            className="border border-solid border-border dark:border-dark_border rounded-22 overflow-hidden"
                        >
                            <div className="grid grid-cols-2">
                                <div className="relative aspect-square">
                                    <Image
                                        src={item.imageUrl as string}
                                        alt={`${item.title} - sebelum`}
                                        fill
                                        quality={100}
                                        sizes="(min-width: 768px) 25vw, 50vw"
                                        className="object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Sebelum
                                    </span>
                                </div>
                                <div className="relative aspect-square">
                                    <Image
                                        src={item.secondaryImageUrl as string}
                                        alt={`${item.title} - sesudah`}
                                        fill
                                        quality={100}
                                        sizes="(min-width: 768px) 25vw, 50vw"
                                        className="object-cover"
                                    />
                                    <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Sesudah
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h6 className="text-lg font-bold text-secondary dark:text-white">
                                    {item.title}
                                </h6>
                                {item.description && (
                                    <p className="text-xs text-SlateBlueText dark:text-opacity-70 pt-1">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
