"use client";

import { useState } from "react";
import type { ContentBlock } from "@/db/schema";

export function FaqAccordion({ faqs }: { faqs: ContentBlock[] }) {
    const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

    return (
        <div className="max-w-920 m-auto space-y-4">
            {faqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                    <div
                        key={faq.id}
                        data-aos="fade-up"
                        data-aos-delay={`${index * 100}`}
                        data-aos-duration="1000"
                        className="border border-solid border-border dark:border-dark_border rounded-22 overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                        >
                            <span className="text-lg font-bold text-secondary dark:text-white">
                                {faq.title}
                            </span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`shrink-0 text-primary transition-transform duration-0.4s ${isOpen ? "rotate-180" : ""}`}
                            >
                                <path
                                    d="M6 9l6 6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        {isOpen && faq.description && (
                            <div className="px-6 pb-5">
                                <p className="text-SlateBlueText dark:text-opacity-80 text-base">
                                    {faq.description}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
