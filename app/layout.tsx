import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import "./globals.css";
import { exo2, orbitron } from "./fonts";

export const metadata = {
  title: { default: "Indie Gamer", template: "%s | Indie Gamer" },
};

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        <header>
          <NavBar></NavBar>
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="text-center tex-xs border-t py-3">
          Game images courtesy of{" "}
          <a
            href="https://rawg.io"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>{" "}
          | Game reviews courtesy of{" "}
          <a
            href="https://in.ign.com/"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            IGN
          </a>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
