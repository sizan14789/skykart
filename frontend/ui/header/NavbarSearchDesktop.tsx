import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function NavbarSearchDesktop() {
  return (
    <form className="hidden lg:flex h-10 grow justify-end">
      <input
        type="text"
        placeholder="search"
        name="search"
        className="outline-none border border-(--border) border-r-0 pl-2 rounded-tl-md rounded-bl-md grow focus:border-(--primary) max-w-[29rem]"
        required
      />
      <button className="button-primary h-full w-10 flex items-center justify-center rounded-tl-none! rounded-bl-none!">
        <MagnifyingGlassIcon size={20} weight="light" />
      </button>
    </form>
  );
}
