import { getBlocksByType } from "@/lib/content";
import YearHighlightGallery from "./YearHighlightGallery";

const DEFAULT_STATS = [
    { id: "default-1", title: "Pasien Puas", subtitle: "5000+" },
    { id: "default-2", title: "Tahun Pengalaman", subtitle: "10+" },
    { id: "default-3", title: "Jenis Treatment", subtitle: "50+" },
];

const Highlight = async () => {
    const stats = await getBlocksByType("stat");
    const items = stats.length > 0 ? stats.slice(0, 3) : DEFAULT_STATS;

    return (
        <>
            <section className="bg-IcyBreeze dark:bg-darklight">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center max-w-[125rem] mx-auto">
                        <div
                            className="col-span-5 py-0 px-7"
                            data-aos="fade-right"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                        >
                            <h2>Dipercaya Ribuan Pasien</h2>
                            <p className="text-lg font-normal text-SlateBlueText dark:text-opacity-80 max-w-404 pt-7 pb-11">
                                Kepuasan dan keamanan pasien adalah prioritas utama kami dalam
                                setiap perawatan.
                            </p>
                            <div className="flex items-center flex-wrap gap-30">
                                {items.map((item) => (
                                    <div key={item.id} className="text-start sm:pb-0 pb-5">
                                        <h2 className="text-primary">{item.subtitle}</h2>
                                        <p className="text-lg font-medium text-secondary dark:text-darktext">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className="col-span-7 year_slider px-7"
                            data-aos="fade-left"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                        >
                            <YearHighlightGallery />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Highlight;
