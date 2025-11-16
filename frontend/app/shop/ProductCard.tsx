"use client";

import useCartStore from "@/context/CartStore";
import { handleAddToCart, handleBuyNow } from "@/lib/cartLib";
import { ProductCardType } from "@/types/ProductsTypes";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ data }: { data: ProductCardType }) {
  const {
    id,
    product_name,
    product_image,
    rating,
    offer_price,
    price,
    offer_percentage,
  } = data;
  const { cart, setCart } = useCartStore();
  const router = useRouter();

  const handleAddToCartButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart({ id, cart, setCart });
  };

  const handleBuyNowButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleBuyNow({ id, cart, setCart, router });
  };

  return (
    <div
      className="flex flex-col border border-(--border) rounded-md p-4 pb-6 grow hover:border-(--primary) duration-200 group cursor-pointer h-full min-h-83.75 justify-end relative"
      onClick={() => router.push("/shop/" + id)}
    >
      <figure className="flex justify-center items-center mb-auto rounded-md overflow-hidden flex-col">
        <Image
          src={product_image}
          width={300}
          height={300}
          alt={product_name + " " + "image"}
          className="object-cover group-hover:scale-110 duration-200"
        />
        <h2 className="text-center text-sm mt-4">
          {product_name.length > 40
            ? product_name.slice(0, 40) + "..."
            : product_name}
        </h2>
      </figure>

      <div className="flex flex-col mb-2 items-center gap-2">
        <p className="text-(--subtext) text-xs ">Rating: {rating}/5</p>
        <div className="flex gap-1 items-end">
          <p>${offer_price}</p> 
          <p className="line-through text-xs mb-0.5">${price}</p>
        </div>
      </div>

      <div className="flex gap-2 ">
        <button
          className="button-secondary h-10 flex-1 justify-center items-center rounded-full!"
          onClick={(e) => handleAddToCartButtonClick(e)}
        >
          <ShoppingCartIcon size={20} weight="light" />
        </button>
        <button
          className="button-secondary rounded-full! justify-center items-center h-10 flex-1"
          onClick={(e) => handleBuyNowButtonClick(e)}
        >
          Buy Now
        </button>
      </div>
      <span className="absolute top-0 left-0 bg-(--text-deep) text-(--bg) h-11 aspect-square flex items-center justify-center text-sm rounded-sm ">
        -{offer_percentage}%
      </span>
    </div>
  );
}
