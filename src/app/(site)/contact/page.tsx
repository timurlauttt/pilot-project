import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import TicketSection from "@/components/Home/TicketSection";
import { getBlocksByType, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
    title: "Kontak | Klinik Kecantikan",
};

const page = async () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Kontak" },
  ];

  const [services, settings] = await Promise.all([getBlocksByType("service"), getSiteSettings()]);

  return (
    <>
      <HeroSub
        title="Hubungi Kami"
        description="Ada pertanyaan seputar treatment atau ingin booking jadwal? Hubungi kami lewat form atau WhatsApp."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm services={services} whatsappNumber={settings?.whatsappNumber} />
      <TicketSection/>
    </>
  );
};

export default page;
