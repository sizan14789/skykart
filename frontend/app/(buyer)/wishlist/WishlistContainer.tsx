"use client";

import { ProductCardType } from "@/types/ProductsTypes";
import WishlistProductCard from "./WishlistProductCard";
import { useState } from "react";

export default function WishlistContainer({
  list,
}: {
  list: ProductCardType[];
}) {
  const [localWishlist, setLocalWishlist] = useState(list);

  if (!localWishlist) return <></>;

  const removeFromList = async (id: number) => {
    const newList = localWishlist.filter((each) => each.id !== id);
    setLocalWishlist(newList);
  };

  return (
    <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
      {localWishlist.length == 0 ? (
        <h2 className="text-(--subtext) text-sm self-center">Empty List</h2>
      ) : (
        localWishlist.map((each: ProductCardType) => {
          return <WishlistProductCard data={each} key={each.id} removeFromList={removeFromList} />;
        })
      )}
    </div>
  );
}
