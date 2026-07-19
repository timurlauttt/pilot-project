import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";

const Footer = async () => {
    const settings = await getSiteSettings();

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "/speakers", label: "Dokter Kami" },
        { href: "/contact", label: "Kontak" },
    ];

    const socialLinks = [
        { href: settings?.facebookUrl, label: "Facebook" },
        { href: settings?.instagramUrl, label: "Instagram" },
        { href: settings?.tiktokUrl, label: "TikTok" },
    ].filter((social) => social.href);

    return (
        <footer className="bg-secondary">
            <div className="container">
                <div className="flex items-center justify-between flex-wrap md:pt-44 pt-16 md:pb-20 pb-6 border-b border-solid border-dark_border">
                    <div>
                        <Link href="/">
                            {settings?.logoUrl ? (
                                <Image
                                    src={settings.logoUrl}
                                    alt={settings?.clinicName || "Logo"}
                                    width={160}
                                    height={50}
                                    quality={100}
                                    style={{ width: 'auto', height: '50px' }}
                                />
                            ) : (
                                <span className="text-2xl font-bold text-white">
                                    {settings?.clinicName || "Klinik Kecantikan"}
                                </span>
                            )}
                        </Link>
                    </div>
                    <div>
                        <ul className="flex items-center flex-wrap md:gap-30 gap-3 md:py-0 py-5">
                            {navLinks.map((link) => (
                                <li
                                    key={link.href}
                                    className="text-PaleCerulean sm:text-xl text-lg font-normal transition-all duration-0.4s hover:text-primary"
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {socialLinks.length > 0 && (
                        <div>
                            <ul className="flex items-center gap-5">
                                {socialLinks.map((social) => (
                                    <li key={social.label}>
                                        <Link href={social.href as string} target="_blank" className="group" aria-label={social.label}>
                                            {social.label === "Facebook" && (
                                                <svg width="26" height="27" fill="white" viewBox="0 0 26 27" className="group-hover:fill-ElectricAqua" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_7_993)">
                                                        <path d="M23.8293 1.63855H2.14412C1.40159 1.639 0.799656 2.24123 0.799805 2.98405V24.6692C0.800251 25.4118 1.40248 26.0137 2.14531 26.0135H13.8204V16.5873H10.6545V12.8977H13.8204V10.1824C13.8204 7.03366 15.7427 5.31979 18.5516 5.31979C19.8969 5.31979 21.053 5.42007 21.39 5.46485V8.75586H19.4531C17.9249 8.75586 17.629 9.48202 17.629 10.5478V12.8977H21.2829L20.8068 16.5873H17.629V26.0135H23.8293C24.5723 26.0137 25.1747 25.4116 25.1748 24.6686C25.1748 24.6685 25.1748 24.6683 25.1748 24.668V2.98286C25.1745 2.24034 24.5721 1.6384 23.8293 1.63855Z" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_7_993">
                                                            <rect width="26" height="26" fill="white" transform="translate(0 0.838745)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            )}
                                            {social.label === "Instagram" && (
                                                <svg width="26" height="27" viewBox="0 0 26 27" fill="#fff" className="group-hover:fill-ElectricAqua" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_7_995)">
                                                        <path d="M24.1249 0.838745H1.87514C0.839478 0.838745 0 1.67822 0 2.71388V24.9636C0 25.9993 0.839478 26.8387 1.87514 26.8387H24.1249C25.1605 26.8387 26 25.9993 26 24.9636V2.71388C26 1.67822 25.1605 0.838745 24.1249 0.838745V0.838745ZM18.9357 10.9748C18.9414 11.1027 18.9442 11.2312 18.9442 11.3604C18.9442 15.3033 15.9429 19.85 10.4544 19.8502H10.4546H10.4544C8.76929 19.8502 7.20122 19.3562 5.88071 18.5098C6.11418 18.5374 6.35182 18.5511 6.59244 18.5511C7.99051 18.5511 9.2771 18.0742 10.2985 17.2738C8.99225 17.2496 7.89093 16.3869 7.51086 15.2013C7.69276 15.2362 7.87982 15.2553 8.07164 15.2553C8.34399 15.2553 8.60782 15.2186 8.85855 15.1501C7.49321 14.8768 6.46469 13.6701 6.46469 12.2253C6.46469 12.2118 6.46469 12.1997 6.46509 12.1872C6.86717 12.4107 7.32698 12.5452 7.81654 12.5603C7.01535 12.0257 6.48869 11.1118 6.48869 10.0766C6.48869 9.52988 6.63647 9.0177 6.89276 8.57674C8.36423 10.3822 10.5633 11.5697 13.0432 11.6944C12.9921 11.4758 12.9657 11.2481 12.9657 11.014C12.9657 9.36682 14.3021 8.03044 15.9499 8.03044C16.8082 8.03044 17.5834 8.39325 18.1279 8.97327C18.8077 8.83917 19.446 8.59082 20.0227 8.24904C19.7995 8.9455 19.3266 9.52988 18.7105 9.89943C19.3141 9.82722 19.8894 9.66714 20.424 9.4295C20.0247 10.028 19.5182 10.5536 18.9357 10.9748Z" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_7_995">
                                                            <rect width="26" height="26" fill="white" transform="translate(0 0.838745)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            )}
                                            {social.label === "TikTok" && (
                                                <span className="flex items-center justify-center w-[26px] h-[27px] rounded-full bg-white">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#102C46" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                                </svg>
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="py-8">
                    <p className="text-base font-normal text-PaleCerulean">
                        © All rights reserved. Made by{" "}
                        <Link
                            href="https://nextjs-templates.com/"
                            className="hover:text-white"
                            target="_blank"
                        >
                            NextJs Templates
                        </Link>
                    </p>
                    <p className="text-base font-normal text-PaleCerulean">
                        Distributed by {" "}
                        <Link
                            href="https://themewagon.com/"
                            className="hover:text-white"
                            target="_blank"
                        >
                            ThemeWagon
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
