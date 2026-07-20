import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    clinicName?: string | null;
    logoUrl?: string | null;
}

const Logo: React.FC<LogoProps> = ({ clinicName, logoUrl }) => {
    if (logoUrl) {
        return (
            <Link href="/">
                <Image
                    src={logoUrl}
                    alt={clinicName || "Logo"}
                    width={160}
                    height={50}
                    style={{ width: 'auto', height: '50px' }}
                    quality={100}
                />
            </Link>
        );
    }

    return (
        <Link href="/" className="text-2xl font-bold text-secondary dark:text-white">
            {clinicName || "Klinik Estetika Persona"}
        </Link>
    );
};

export default Logo;
