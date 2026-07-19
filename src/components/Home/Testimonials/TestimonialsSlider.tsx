"use client";
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import type { ContentBlock } from "@/db/schema";

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ms-1 ${i < rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            ))}
        </div>
    );
}

export function TestimonialsSlider({ testimonials }: { testimonials: ContentBlock[] }) {
    var settings = {
        dots: false,
        infinite: testimonials.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 1, slidesToScroll: 1, infinite: testimonials.length > 1, dots: true },
            },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <Slider {...settings}>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id}>
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                        <div className="col-span-4 bg-LightSkyBlue sm:rounded-br-214 rounded-br-182 sm:rounded-tl-214 rounded-tl-182 relative before:content-[''] before:absolute before:bg-[url('/images/testimonials/quotes.png')] before:w-109 before:h-109 before:-right-10 before:top-32 lg:inline-block hidden">
                            <Image
                                src={testimonial.imageUrl || "/images/hero/john.png"}
                                alt={testimonial.title || "Testimoni"}
                                width={0}
                                height={0}
                                quality={100}
                                layout="responsive"
                                sizes="100vh"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="col-span-8 md:ml-28 ml-0">
                            <h2 className="max-w-72">Apa Kata Pasien Kami</h2>
                            <p className="text-lg font-normal text-SlateBlueText dark:text-opacity-80 py-10 max-w-632">
                                {testimonial.description}
                            </p>
                            <div className="flex items-center gap-8">
                                <div>
                                    <Image
                                        src={testimonial.imageUrl || "/images/testimonials/testimonials-profile.png"}
                                        alt={testimonial.title || "Pasien"}
                                        width={0}
                                        height={0}
                                        quality={100}
                                        layout="responsive"
                                        sizes="100vh"
                                        className="!w-16 !h-16 rounded-full"
                                    />
                                </div>
                                <div>
                                    <p className="text-xl font-medium text-secondary dark:text-white pb-1">
                                        {testimonial.title}
                                    </p>
                                    <Stars rating={testimonial.rating ?? 5} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}
