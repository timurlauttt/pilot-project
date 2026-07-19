import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getSiteSettings, toWhatsAppLink } from "@/lib/content";

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-primary">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.766.46 3.492 1.334 5.012L2 22l5.116-1.317A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.09a8.06 8.06 0 0 1-4.11-1.12l-.294-.174-3.036.782.81-2.96-.192-.304A8.09 8.09 0 1 1 20.09 12c0 4.465-3.63 8.09-8.086 8.09z" />
        </svg>
    );
}

const ContactInfo = async () => {
    const settings = await getSiteSettings();
    const waLink = toWhatsAppLink(settings?.whatsappNumber, "Halo, saya ingin bertanya seputar treatment.");
    const mapsLink = settings?.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
        : undefined;

    return (
        <>
            <section className="dark:bg-darkmode lg:pt-20 pt-16 lg:pb-24 pb-10">
                <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
                    <div className="flex md:flex-row flex-col lg:items-center items-start justify-center md:gap-28 gap-8">
                        <div className="flex sm:flex-row flex-col items-start sm:gap-8 gap-4">
                            <div className="bg-primary/20 w-14 h-14 flex items-center justify-center rounded-full">
                                <WhatsAppIcon />
                            </div>
                            <div className="flex md:flex-col sm:flex-row flex-col md:items-start sm:items-center items-start h-full justify-between">
                                <div>
                                    <span className="text-secondary dark:text-white text-xl font-bold">
                                        WhatsApp Kami
                                    </span>
                                    <p className="text-SlateBlueText font-normal text-xl max-w-80 pt-3 pb-7 dark:text-opacity-80">
                                        Tanya-tanya atau booking treatment langsung lewat WhatsApp, kami respon cepat.
                                    </p>
                                </div>
                                {waLink && (
                                    <div>
                                        <Link href={waLink} target="_blank" className="text-primary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white">
                                            Chat sekarang
                                            <svg width="23" height="17" viewBox="0 0 23 17" fill="#2F73F2" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-secondary group-hover:dark:fill-white">
                                                <path d="M22.653 7.76352L15.3613 0.471852C15.1648 0.282104 14.9017 0.177109 14.6286 0.179483C14.3555 0.181856 14.0942 0.291407 13.9011 0.484541C13.7079 0.677674 13.5984 0.938937 13.596 1.21206C13.5936 1.48518 13.6986 1.74831 13.8884 1.94477L19.4019 7.45831H1.08317C0.806904 7.45831 0.541951 7.56806 0.346601 7.76341C0.151251 7.95876 0.0415039 8.22371 0.0415039 8.49998C0.0415039 8.77625 0.151251 9.0412 0.346601 9.23655C0.541951 9.4319 0.806904 9.54165 1.08317 9.54165H19.4019L13.8884 15.0552C13.7889 15.1513 13.7095 15.2662 13.6549 15.3933C13.6003 15.5204 13.5716 15.6571 13.5704 15.7954C13.5692 15.9337 13.5956 16.0709 13.6479 16.1989C13.7003 16.3269 13.7777 16.4432 13.8755 16.541C13.9733 16.6388 14.0896 16.7162 14.2176 16.7685C14.3456 16.8209 14.4828 16.8473 14.6211 16.8461C14.7594 16.8449 14.8961 16.8161 15.0232 16.7615C15.1503 16.707 15.2652 16.6276 15.3613 16.5281L22.653 9.23644C22.8482 9.0411 22.958 8.77619 22.958 8.49998C22.958 8.22377 22.8482 7.95886 22.653 7.76352Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col items-start sm:gap-8 gap-4">
                            <div className="bg-primary/20 w-14 h-14 flex items-center justify-center rounded-full">
                                <MapPin className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex md:flex-col sm:flex-row flex-col md:items-start sm:items-center items-start h-full justify-between">
                                <div>
                                    <span className="text-secondary dark:text-white text-xl font-bold">
                                        Alamat & Jam Buka
                                    </span>
                                    <p className="text-SlateBlueText font-normal text-xl max-w-80 pt-3 pb-2 dark:text-opacity-80">
                                        {settings?.address || "Alamat akan segera diinformasikan."}
                                    </p>
                                    {settings?.operationalHours && (
                                        <p className="text-SlateBlueText font-normal text-base max-w-80 pb-7 dark:text-opacity-80">
                                            {settings.operationalHours}
                                        </p>
                                    )}
                                </div>
                                {mapsLink && (
                                    <div>
                                        <Link href={mapsLink} target="_blank" className="text-primary text-lg font-medium flex items-center gap-3 group hover:text-secondary dark:hover:text-white">
                                            Buka di Google Maps
                                            <svg width="23" height="17" viewBox="0 0 23 17" fill="#2F73F2" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-secondary group-hover:dark:fill-white">
                                                <path d="M22.653 7.76352L15.3613 0.471852C15.1648 0.282104 14.9017 0.177109 14.6286 0.179483C14.3555 0.181856 14.0942 0.291407 13.9011 0.484541C13.7079 0.677674 13.5984 0.938937 13.596 1.21206C13.5936 1.48518 13.6986 1.74831 13.8884 1.94477L19.4019 7.45831H1.08317C0.806904 7.45831 0.541951 7.56806 0.346601 7.76341C0.151251 7.95876 0.0415039 8.22371 0.0415039 8.49998C0.0415039 8.77625 0.151251 9.0412 0.346601 9.23655C0.541951 9.4319 0.806904 9.54165 1.08317 9.54165H19.4019L13.8884 15.0552C13.7889 15.1513 13.7095 15.2662 13.6549 15.3933C13.6003 15.5204 13.5716 15.6571 13.5704 15.7954C13.5692 15.9337 13.5956 16.0709 13.6479 16.1989C13.7003 16.3269 13.7777 16.4432 13.8755 16.541C13.9733 16.6388 14.0896 16.7162 14.2176 16.7685C14.3456 16.8209 14.4828 16.8473 14.6211 16.8461C14.7594 16.8449 14.8961 16.8161 15.0232 16.7615C15.1503 16.707 15.2652 16.6276 15.3613 16.5281L22.653 9.23644C22.8482 9.0411 22.958 8.77619 22.958 8.49998C22.958 8.22377 22.8482 7.95886 22.653 7.76352Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-solid  dark:border-dark_border"></div>
            </section>
        </>
    );
};

export default ContactInfo;
