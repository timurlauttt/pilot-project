import { getBlocksByType } from "@/lib/content";
import { FaqAccordion } from "./FaqAccordion";

const Faq = async () => {
    const faqs = await getBlocksByType("faq");

    if (faqs.length === 0) return null;

    return (
        <section className="bg-IcyBreeze dark:bg-darklight">
            <div className="container">
                <div className="text-center md:pb-16 pb-8">
                    <h2 data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                        Tanya Jawab Singkat
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-duration="1000"
                        className="text-SlateBlueText dark:text-opacity-80 text-lg font-normal max-w-920 m-auto"
                    >
                        Pertanyaan yang sering ditanyakan seputar treatment kami.
                    </p>
                </div>
                <FaqAccordion faqs={faqs} />
            </div>
        </section>
    );
};

export default Faq;
