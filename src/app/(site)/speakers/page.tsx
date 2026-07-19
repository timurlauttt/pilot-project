import Testimonials from "@/components/Home/Testimonials";
import TicketSection from "@/components/Home/TicketSection";
import WorkSpeakers from "@/components/Home/WorkSpeakers";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dokter Kami | Klinik Kecantikan",
};

const page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/speakers", text: "Dokter Kami" },
      ];
  return (
    <>
      <HeroSub
        title="Tim Dokter & Terapis Kami"
        description="Ditangani oleh dokter dan terapis berpengalaman, siap membantu perawatan kulit dan kecantikan Anda."
        breadcrumbLinks={breadcrumbLinks}
      />
      <WorkSpeakers showTitle={false} />
      <Testimonials/>
      <TicketSection/>
    </>
  );
};

export default page;
