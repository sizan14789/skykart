import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";
import { cookies } from 'next/headers'
import UserSetter from "@/lib/UserSetter";
import { Toaster } from "react-hot-toast";
import { getUser } from "@/lib/getuser";

const poppins = Poppins({
  weight: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyKart",
  description: "A Marketplace app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || "light";

  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased flex flex-col min-h-svh text-sm md:text-[1rem] bg-(--bg) text-(--text) duration-200 ${theme.toString()==="dark" ? "dark" : ""}`}
      >
        <UserSetter />
        <Toaster />
        <Header theme={theme.toString()} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
