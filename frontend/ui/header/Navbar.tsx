"use client";

import Link from "next/link";
import useNavStore from "@/context/Nav";
import {
  MoonIcon,
  ShoppingCartSimpleIcon,
  SunDimIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { setCookie } from "cookies-next";
import NavbarSearchMobile from "./NavbarSearchMobile";
import NavbarAuth from "./NavbarAuth";
import NavbarSearchDesktop from "./NavbarSearchDesktop";
import { userType } from "@/types/UserType";

export default function Navbar({ theme, user }: { theme: string, user: userType }) {
  const { navOpen, setNavOpen } = useNavStore();
  const [localTheme, setTheme] = useState<string>(theme);

  const toggleTheme = () => {
    if (localTheme !== "dark") {
      setTheme("dark");
      document.body.classList.add("dark");
      setCookie("theme", "dark");
    } else {
      setTheme("light");
      document.body.classList.remove("dark");
      setCookie("theme", "light");
    }
  };

  return (
    <div className="flex gap-4 md:gap-6 grow items-center justify-end">
      
      <NavbarSearchDesktop />

      <Link href="/cart" className="active:scale-90">
        <ShoppingCartSimpleIcon size={20} weight="light" />
      </Link>

      <button
        className="cursor-pointer duration-200 active:scale-90"
        onClick={toggleTheme}
      >
        {localTheme !== "dark" ? (
          <MoonIcon size={20} weight="light" />
        ) : (
          <SunDimIcon size={20} weight="light" />
        )}
      </button>

      {/* mobile */}
      <nav
        className={`lg:hidden flex absolute top-0 left-0 min-h-svh min-w-svw -translate-x-full transition duration-300 ease-in-out ${
          navOpen ? "translate-x-0" : ""
        } `}
      >
        <div className="flex flex-col justify-center items-center min-h-svh w-1/2 bg-(--bg) pb-64">
          <button
            onClick={() => setNavOpen(false)}
            className="w-full min-h-20 flex justify-center items-center"
          >
            <p className="h-16 w-16 rounded-full bg-(--) flex justify-center items-center cursor-pointer hover:text-white hover:bg-(--primary) duration-200 active:scale-90">
              <XIcon size={36} weight="light" />
            </p>
          </button>

          <NavbarSearchMobile />
          <Link
            href="/shop"
            onClick={() => setNavOpen(false)}
            className="border-b border-b-(--border) w-full min-h-20 flex justify-center items-center duration-200 hover:brightness-90 hover:text-(--primary) active:scale-90 bg-(--bg) hover:font-medium "
          >
            Shop
          </Link>
          <Link
            href="/orders"
            onClick={() => setNavOpen(false)}
            className="border-b border-b-(--border) w-full min-h-20 flex justify-center items-center duration-200 hover:brightness-90 hover:text-(--primary) active:scale-90 bg-(--bg) hover:font-medium "
          >
            My Orders
          </Link>
        </div>
        <div
          className={`min-h-svh grow bg-gray-400/30 transition duration-600 ease-in-out ${
            navOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setNavOpen(false)}
        ></div>
      </nav>

      {/* desktop */}
      <nav className="hidden lg:flex items-center gap-6 justify-center">
        <Link className="hover:text-(--primary) duration-200 " href="/shop">Shop</Link>
        <Link className="hover:text-(--primary) duration-200 " href="/orders">My Orders</Link>
      </nav>

      {/* Authentication  */}
      <NavbarAuth user={user} />
    </div>
  );
}
