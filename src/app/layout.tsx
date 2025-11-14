import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./style/globals.css";
import Header from "./components/Header";
import BodyStyler from "./components/BodyStyler";

const alvertSans = Albert_Sans({
  variable: "--font-alvert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hanja Deck AI",
  description: "Hanja flashcard deck ai generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${alvertSans.variable} bg-right! bg-no-repeat! antialiased p-6 max-w-[1228px] m-auto`}
      >
        <BodyStyler/>
        <Header/>
        <main className="min-h-dvh mb-20 overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
