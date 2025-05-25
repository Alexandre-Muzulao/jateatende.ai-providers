import '@/app/ui/global.css';
import { ampleSoft } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={`${ampleSoft.variable} dark:bg-background-dark`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}