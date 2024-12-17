{`import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skillopa - Platform Pembelajaran Online',
  description: 'Belajar skill baru dari instruktur terbaik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}`}