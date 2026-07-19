import React from "react";
import { getBlocksByType } from "@/lib/content";
import { TestimonialsSlider } from "./TestimonialsSlider";

const Testimonials = async () => {
    const testimonials = await getBlocksByType("testimonial");

    if (testimonials.length === 0) return null;

    return (
        <>
            <section className="bg-IcyBreeze dark:bg-darklight testimonial">
                <div className="container">
                    <TestimonialsSlider testimonials={testimonials} />
                </div>
            </section>
        </>
    );
};

export default Testimonials;
