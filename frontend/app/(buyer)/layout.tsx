import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/ui/(buyer)/header/Header";
import Footer from "@/ui/(buyer)/footer/Footer";
import UserSetter from "@/lib/InitialSetter";
import { Toaster } from "react-hot-toast";
import { getTheme, getUser } from "@/lib/initialLoadLib";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: " %s | ShopUp ",
  },
  description: "An E-commerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  const userInfo = await getUser();

  return (
    <html lang="en">
      <body
        className={`${
          poppins.className
        } antialiased flex flex-col min-h-svh text-sm md:text-[1rem] bg-(--bg) text-(--text) duration-200 ${
          theme.toString() === "dark" ? "dark" : ""
        }`}
      >
        <UserSetter userInfo={userInfo} />
        <Toaster />
        <Header theme={theme.toString()} user={userInfo} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
