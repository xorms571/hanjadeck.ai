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
    <html className="overflow-x-hidden" lang="en">
      <body
        className={`${alvertSans.variable} bg-right! bg-no-repeat! antialiasedmax-w-[1228px] m-auto`}
      >
        <BodyStyler/>
        <Header />
        <main className="min-h-dvh mb-20 p-6 pt-30">{children}</main>
      </body>
    </html>
  );
}
