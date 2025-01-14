import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../context/Providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  min-h-screen h-full w-full grid grid-cols-[300px,1fr] grid-rows-[64px,1fr]`}>
        <Providers>
          <header className="bg-zinc-950 border-b border-zinc-800 col-span-2 flex items-center p-2">
            <span className="text-2xl font-semibold">Password Keeper</span>
          </header>
          <aside className="bg-zinc-950 border-r border-zinc-800 p-2">
            <div className="flex flex-col gap-1 ">
              <span>Add Password</span>
              <span>My Passwords</span>
            </div>
          </aside>
          <main className="bg-zinc-950 p-2"> {children}</main>
        </Providers>
      </body>
    </html>
  );
}
