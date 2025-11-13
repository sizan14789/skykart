"use client";

import { XIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import FilterBoxForm from "./FilterBoxForm";

export default function FIlterBox({ search="" }: { search: string }) {
  const [filterPanel, setFilterPanel] = useState<Boolean>(false);
  const router = useRouter();

  const handleFilter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let query = "?search=" + search;

    const formdata = Object.fromEntries(new FormData(e.currentTarget));

    // adding min and max price
    if (formdata.min_price !== "") query += "&min_price=" + formdata.min_price;
    if (formdata.max_price !== "") query += "&max_price=" + formdata.max_price;

    // deleting others to filter accessories
    delete formdata.min_price;
    delete formdata.max_price;

    // building categories query
    let categories = "";
    const categoriesArray = Object.keys(formdata);
    categoriesArray.forEach((each) => {
      categories += each + ";";
    });
    if (categories !== "") query += "&category=" + categories;

    router.push(`/shop${query}`);
  };

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
          filterPanel ? "-translate-x-full " : ""
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

          <FilterBoxForm handleFilter={handleFilter} />
        </div>
      </div>
    </>
  );
}
