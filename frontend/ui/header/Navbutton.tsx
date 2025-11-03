"use client";

import useNavStore from "@/context/Nav";
import { ListIcon } from "@phosphor-icons/react";

export default function NavButton() {
  const { setNavOpen } = useNavStore();

  return (
    <button className="lg:hidden flex justify-center items-center cursor-pointer rounded-full h-10 w-10 sm:h-12 sm:w-12 hover:text-white hover:bg-(--primary) duration-200 active:scale-90" onClick={() => setNavOpen(true)}>
      <ListIcon size={28} weight="light" />
    </button>
  );
}
