"use client";

import { useShopProductsStore } from "@/context/ShopProductsStore";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

export default function ProductsSection() {
  const { products, setProducts } = useShopProductsStore();
  const [state, setState] = useState<string>("loading");

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
    getProducts();
  }, []);

  if (state === "loading")
    return (
      <div className="grow flex justify-center items-center">Loading...</div>
    );

  if (state === "error")
    return <div className="grow flex justify-center items-center">Error</div>;

  return (
    <div className="w-full ">
      <h2 className="text-2xl text-(--primary) my-1 mt-6">Products</h2>
      {products.length === 0 ? (
        <div className="flex justify-center items-center min-h-80">
          <p className="text-sm text-(--subtext) self-center ">
            Sorry, no products
          </p>
        </div>
      ) : (
        <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((each: ProductCardType) => {
            return <ProductCard data={each} key={each.id} />;
          })}
        </div>
      )}
    </div>
  );
}
