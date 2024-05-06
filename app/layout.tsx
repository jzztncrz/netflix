import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/core/styles/globals.css";
import { Children } from "@/core/types/react";
import Navbar from "./_components/navbar";
import { VideoProvider } from "@/core/contexts/video";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix Clone | @jazztinecruz",
  description: "Generated by create next app",
};

type Props = {
  children: Children;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} grid grid-rows-[auto,1fr] bg-primary text-white`}>
        <Navbar />
        <main>
          <VideoProvider>{children}</VideoProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
