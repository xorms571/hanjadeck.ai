import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';
import './style/globals.css';
import Header from './components/Header';
import BodyStyler from './components/BodyStyler';
import { Footer } from './components/Footer';

const alvertSans = Albert_Sans({
  variable: '--font-alvert-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hanja Deck AI',
  description: 'Hanja flashcard deck ai generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <body
        className={`${alvertSans.variable} bg-right! bg-no-repeat!`}
      >
        <BodyStyler />
        <Header />
        <main className="mb-0 md:mt-10 md:mb-10 max-w-[1228px] m-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
