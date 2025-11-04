import { useSearchProductsStore } from "@/context/SearchContext";
import { useShopProductsStore } from "@/context/ShopProductsStore";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { FormEvent } from "react";

export default function NavbarSearchDesktop() {
  const { setProducts } = useShopProductsStore();
  const { search, setSearch } = useSearchProductsStore();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?search=${search}`
      );
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="hidden lg:flex h-10 grow justify-end" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="outline-none border border-(--border) border-r-0 pl-2 rounded-tl-md rounded-bl-md grow focus:border-(--primary) max-w-116 text-sm text-(--subtext) "
        required
      />
      <button className="button-primary h-full w-10 flex items-center justify-center rounded-tl-none! rounded-bl-none!">
        <MagnifyingGlassIcon size={20} weight="light" />
      </button>
    </form>
  );
}
