import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function NavbarSearchMobile() {
  return (
    <button
      className="border-y border-y-(--border) w-full min-h-20 flex justify-center items-center gap-2 duration-200 hover:brightness-90 hover:text-(--primary) active:scale-90 bg-(--bg) hover:font-medium cursor-pointer"
    >
      <MagnifyingGlassIcon size={20} weight="light" /> 
      {/* Search  */}
    </button>
  );
}
