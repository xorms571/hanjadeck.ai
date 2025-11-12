import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./style/globals.css";
import Header from "./components/Header";

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
    <html lang="en">
      <body
        className={`${alvertSans.variable} antialiased p-6 max-w-[1228px] m-auto`}
      >
        <Header/>
        <main className="min-h-dvh mb-20">{children}</main>
      </body>
    </html>
  );
}
