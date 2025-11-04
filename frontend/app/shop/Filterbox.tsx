"use client";

import { useSearchProductsStore } from "@/context/SearchContext";
import { useShopProductsStore } from "@/context/ShopProductsStore";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";

export default function FilterBox() {
  const { setProducts } = useShopProductsStore();
  const { search, setSearch } = useSearchProductsStore();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?search=${search}`
      );
      const data = await res.json();
      console.log(data)
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full my-8 flex lg:hidden">
      <form className="flex h-10 grow justify-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search"
          name="search"
          className="outline-none border border-(--border) border-r-0 pl-2 rounded-tl-md rounded-bl-md grow focus:border-(--primary) max-w-72 md:max-w-100 text-(--subtext) text-sm "
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="button-primary h-full w-10 flex items-center justify-center rounded-tl-none! rounded-bl-none!"
          type="submit"
        >
          <MagnifyingGlassIcon size={20} weight="light" />
        </button>
      </form>
    </div>
  );
}
