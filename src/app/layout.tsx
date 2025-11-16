import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./style/globals.css";
import Header from "./components/Header";
import BodyStyler from "./components/BodyStyler";
import { getCurrentUser } from "@/lib/auth";

const alvertSans = Albert_Sans({
  variable: "--font-alvert-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hanja Deck AI",
  description: "Hanja flashcard deck ai generator",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body
        className={`${alvertSans.variable} bg-right! bg-no-repeat! antialiased p-6 max-w-[1228px] m-auto`}
      >
        <BodyStyler/>
        <Header user={user}/>
        <main className="min-h-dvh mb-20">{children}</main>
      </body>
    </html>
  );
}
