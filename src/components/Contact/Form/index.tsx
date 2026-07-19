"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ContentBlock } from "@/db/schema";

interface ContactFormProps {
    services: ContentBlock[];
    whatsappNumber: string | null | undefined;
}

const ContactForm = ({ services, whatsappNumber }: ContactFormProps) => {
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!whatsappNumber) return;

        const lines = [
            `Halo, saya ingin booking treatment.`,
            name && `Nama: ${name}`,
            service && `Treatment: ${service}`,
            date && `Tanggal: ${date}`,
            time && `Jam: ${time}`,
        ].filter(Boolean);

        const digits = whatsappNumber.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
        window.open(url, "_blank");
    }

    return (
        <>
            <section className="dark:bg-darkmode lg:pb-24 pb-16 pt-0">
                <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
                        <div className="col-span-6">
                            <h2 className="max-w-72 text-[40px] leading-[3.4rem] font-bold mb-9 text-secondary">Booking Treatment</h2>
                            <form className="flex flex-wrap w-full m-auto justify-between" onSubmit={handleSubmit}>
                                <div className="sm:flex gap-3 w-full">
                                    <div className="mx-0 my-2.5 flex-1">
                                        <label htmlFor="name" className="pb-3 inline-block text-base text-SlateBlueText">Nama Lengkap*</label>
                                        <input
                                            id="name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white  dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="sm:flex gap-3 w-full">
                                    <div className="mx-0 my-2.5 flex-1">
                                        <label htmlFor="service" className="pb-3 inline-block text-base text-SlateBlueText">Pilih Treatment*</label>
                                        <select
                                            id="service"
                                            required
                                            value={service}
                                            onChange={(e) => setService(e.target.value)}
                                            className="w-full text-base px-4 py-2.5 text-SlateBlueText rounded-lg border-border dark:text-white border-solid dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                                        >
                                            <option value="">Pilih treatment</option>
                                            {services.map((s) => (
                                                <option key={s.id} value={s.title ?? ""}>
                                                    {s.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:flex gap-3 w-full">
                                    <div className="mx-0 my-2.5 flex-1">
                                        <label htmlFor="date" className="pb-3 inline-block text-base text-SlateBlueText">Tanggal*</label>
                                        <input
                                            id="date"
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full text-base text-SlateBlueText px-4 rounded-lg py-2.5 outline-none dark:text-white dark:bg-darkmode border-border border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                                            type="date"
                                        />
                                    </div>
                                    <div className="mx-0 my-2.5 flex-1">
                                        <label htmlFor="time" className="pb-3 inline-block text-base text-SlateBlueText">Jam*</label>
                                        <input
                                            id="time"
                                            required
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full text-base px-4 rounded-lg py-2.5 border-border outline-none dark:text-white dark:bg-darkmode border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                                            type="time"
                                        />
                                    </div>
                                </div>
                                <div className="mx-0 my-2.5 w-full">
                                    <button type="submit" className="mt-4 btn btn-1 hover-filled-slide-down overflow-hidden rounded-lg">
                                        <span>Kirim via WhatsApp</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-6">
                            <Image
                                src="https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?fm=jpg&q=80&w=1300&auto=format&fit=crop"
                                alt="Perawatan kecantikan di klinik"
                                width={1300}
                                height={0}
                                quality={100}
                                style={{ width: '100%', height: 'auto' }}
                                className="bg-no-repeat bg-contain rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactForm;
