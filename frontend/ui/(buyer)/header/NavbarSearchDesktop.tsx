import { useGlobalSearchStore } from "@/context/GlobalSearch"; 
import { MagnifyingGlassIcon } from "@phosphor-icons/react";  
import { useRouter } from "next/navigation";

export default function NavbarSearchDesktop() {
  const { handleSearchFormSubmit } = useGlobalSearchStore()
  const router = useRouter();

  return (
    <form className="hidden lg:flex h-10 grow justify-end" onSubmit={(e)=>handleSearchFormSubmit(e, router)}>
      <input
        type="search"
        placeholder="search"
        name="search"
        className="outline-none border border-(--border) border-r-0 pl-2 rounded-tl-sm rounded-bl-sm grow focus:border-(--primary) max-w-116 text-sm text-(--subtext) "
        required
      />
      <button className="button-primary h-full w-10 flex items-center justify-center rounded-tl-none! rounded-bl-none!">
        <MagnifyingGlassIcon size={20} weight="light" />
      </button>
    </form>
  );
}
