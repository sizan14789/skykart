import { useGlobalSearchStore } from "@/context/GlobalSearch";
import useNavStore from "@/context/Nav";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavbarSearchMobile() {
  const { setNavOpen } = useNavStore();
  const { handleSearchFormSubmit } = useGlobalSearchStore();

  const [searchBar, setSearchBar] = useState<boolean>(false);
  const router = useRouter();

  const handleSearchModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setNavOpen(false);
    setSearchBar(true);
  };

  return (
    <>
      <button
        className="border-y border-y-(--border) w-full min-h-20 flex justify-center items-center gap-2 duration-200 hover:brightness-90 hover:text-(--primary) active:scale-90 bg-(--bg) hover:font-medium cursor-pointer"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleSearchModal(e)
        }
      >
        <MagnifyingGlassIcon size={20} weight="light" />
      </button>

      <div
        className={`${
          searchBar ? "flex" : "hidden"
        } z-100 h-svh w-svw bg-gray-600/90 fixed top-0 left-0 translate-x-full justify-center pt-20`}
        onClick={() => setSearchBar(false)}
      >
        <form
          className="h-12 flex grow px-10 max-w-160"
          onSubmit={(e)=> handleSearchFormSubmit(e, router, setSearchBar)}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="search"
            placeholder="search"
            name="search"
            className="outline-none border border-(--border) border-r-0 pl-2 rounded-tl-md rounded-bl-md grow  text-sm text-(--subtext) bg-(--bg)"
            required
          />
          <button className="button-primary bg-(--bg)! border border-l-0 border-(--border) h-full w-10 flex items-center justify-center rounded-tl-none! rounded-bl-none! text-(--text)! "
          type="submit"
          >
            <MagnifyingGlassIcon size={20} weight="light" />
          </button>
        </form>
      </div>
    </>
  );
}
