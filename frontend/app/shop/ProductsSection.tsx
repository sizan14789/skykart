"use client";

import { useShopProductsStore } from "@/context/ShopProductsStore";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useGlobalSearchStore } from "@/context/GlobalSearch";
import { ProductCardType } from "@/types/ProductsTypes";
import Loading from "../loading";

export default function ProductsSection({
  searchString,
}: {
  searchString: string | string[] | undefined;
}) {
  const { products, setProducts } = useShopProductsStore();
  const [ state, setState] = useState<string>("loading");
  const { search, setSearch } = useGlobalSearchStore();

  useEffect(() => {
    if (typeof searchString === "string") {
    setSearch(searchString);
  } else {
    setSearch(""); 
  }
  }, [searchString ]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
        setState("success");
      } catch (error) {
        setState("error");
        console.log(error);
      }
    };

    const getProductsBySearch = async (param: string) => {
      try { 
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?search=${param}`
        );
        const data = await res.json();
        setProducts(data);
        setState("success");
      } catch (error) {
        setState("error");
        console.log(error);
      }
    };
    if (search && search!=="")
      getProductsBySearch(search);
    else 
      getProducts();
  }, [search]);

  if (state === "loading")
    return (
      <div className="grow flex justify-center items-center"><Loading /></div>
    );

  if (state === "error")
    return <div className="grow flex justify-center items-center">Error</div>;

  return (
    <div className="w-full ">
      <h2 className="text-2xl my-1 mt-6">Shop</h2>
      {searchString ? (
        <p className="mt-2 text-sm text-(--subtext)  ">You searched for "{searchString}"" </p>
      ) : (
        <></>
      )}
      {products.length === 0 ? (
        <div className="flex justify-center items-center min-h-80">
          <p className="text-sm text-(--subtext) self-center ">
            Sorry, no products
          </p>
        </div>
      ) : (
        <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {products.map((each: ProductCardType) => {
            return <ProductCard data={each} key={each.id} />;
          })}
        </div>
      )}
    </div>
  );
}
