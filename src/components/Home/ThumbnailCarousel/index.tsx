"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const FALLBACK_IMAGES = [
    { src: "/images/ThumbnailSlider/Slider_1.png", alt: "Layanan", label: undefined },
    { src: "/images/ThumbnailSlider/Slider_2.jpg", alt: "Layanan", label: undefined },
    { src: "/images/ThumbnailSlider/Slider_3.png", alt: "Layanan", label: undefined },
    { src: "/images/ThumbnailSlider/Slider_4.jpg", alt: "Layanan", label: undefined },
];

interface ThumbnailCarouselProps {
    images?: { src: string; alt: string; label?: string }[];
}

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({ images }) => {
    const slides = images && images.length > 0 ? images : FALLBACK_IMAGES;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const mainSliderRef = useRef<Slider | null>(null);
    const navSliderRef = useRef<Slider | null>(null);

    const settingsFor = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: navSliderRef.current as Slider, // Ensure proper typing
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: navSliderRef.current as Slider,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: navSliderRef.current as Slider,
                },
            },
        ],
    };

    const settingsNav = {
        slidesToShow: Math.min(3, slides.length),
        slidesToScroll: 1,
        asNavFor: mainSliderRef.current as Slider, // Ensure proper typing
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        beforeChange: (oldIndex: number, newIndex: number) =>
            setActiveIndex(newIndex),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, slides.length),
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(2, slides.length),
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    focusOnSelect: true,
                },
            },
        ],
    };

    useEffect(() => {
        if (mainSliderRef.current) {
            mainSliderRef.current.slickGoTo(activeIndex);
        }
    }, [activeIndex]);

    return (
        <>
            <div>
                <Slider {...settingsFor} ref={mainSliderRef} className="pb-3">
                    {slides.map((slide, index) => (
                        <div key={`main-${index}`}>
                            <div className="relative aspect-[4/3] rounded-tl-[2.5rem] rounded-br-[2.5rem] overflow-hidden">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    quality={100}
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="object-cover"
                                />
                                {slide.label && (
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 pt-12 pb-5">
                                        <p className="text-white text-xl font-bold">{slide.label}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </Slider>
                <Slider {...settingsNav} ref={navSliderRef} className="thumb">
                    {slides.map((slide, index) => (
                        <div key={`thumb-${index}`}>
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    quality={100}
                                    sizes="20vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default ThumbnailCarousel;
