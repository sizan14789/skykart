"use client";

import { XIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FIlterBox({ search }: { search: string }) {
  const [filterPanel, setFilterPanel] = useState<Boolean>(false);
  const router = useRouter();

  const handleFilter = async () => {};

  return (
    <>
      <button
        className="button-secondary h-12 w-32 flex justify-center items-center"
        onClick={() => setFilterPanel(true)}
      >
        Filter
      </button>
      <div
        className={`z-100 flex fixed top-0 left-full min-h-svh min-w-svw transition duration-300 ease-in-out ${
          filterPanel ? "-translate-x-full" : ""
        } `}
      >
        <div
          className={`min-h-svh grow bg-gray-400/30 transition duration-600 ease-in-out  ${
            filterPanel ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setFilterPanel(false)}
        ></div>
        <div className="flex flex-col min-h-svh w-[40%] min-w-76 max-w-120 bg-(--bg)">
          <button
            onClick={() => setFilterPanel(false)}
            className="w-full min-h-20 flex justify-end px-6 items-center"
          >
            <p className="h-16 w-16 button-rounded">
              <XIcon size={36} weight="light" />
            </p>
          </button>
          <form onSubmit={handleFilter} className="h-full flex flex-col overflow-hidden w-full">
            <label htmlFor="price" className="text-sm mb-2 px-2">Price</label>
            <div className="flex max-w-20 items-center gap-4 px-2">
              <input
                type="number"
                name="min_price"
                placeholder="Min"
                className="input max-w-30"
              />
              <p className="text-xs">to</p>
              <input
                type="number"
                name="max_price"
                placeholder="Max"
                className="input max-w-30"
              />
            </div>

            <button className="w-full rounded-none! mt-auto button-primary h-20 flex justify-center items-center text-xl!">
              Filter
            </button>
            
          </form>
        </div>
      </div>
    </>
  );
}
