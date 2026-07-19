import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import { getSiteSettings } from "@/lib/content";

// Public pages render CMS data (D1) per-request via getCloudflareContext,
// which is only available at real request time — never during static build.
export const dynamic = "force-dynamic";

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const settings = await getSiteSettings();

	return (
		<Aoscompo>
			<Header clinicName={settings?.clinicName} logoUrl={settings?.logoUrl} />
			{children}
			<Footer />
			<ScrollToTop />
		</Aoscompo>
	);
}
