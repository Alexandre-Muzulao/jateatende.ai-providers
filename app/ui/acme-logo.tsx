import Image from 'next/image';



interface AcmeLogoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  lightMode?: boolean;
  width?: number;
  height?: number;
}

export default function AcmeLogo({ lightMode = false, width = 300, height = 300 }: AcmeLogoProps) {
  return (
    <div
      className="flex items-center justify-center"
    >
      <Image
        src={`/images/${lightMode ? 'logo-light.png' : 'logo.png'}`}
        width={width}
        height={height}
        alt="Logo"
      />
    </div>
  );
}
