"use client"

import useCartStore from "@/context/CartStore";
import { handleAddToCart, handleBuyNow } from "@/lib/cartLib";
import { ProductCardType } from "@/types/ProductsTypes";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import Image from "next/image"; 
import { useRouter } from "next/navigation";

export default function ProductCard({data}: {data:ProductCardType }) {
  const { id, product_name, product_image, rating, offer_price } = data;
  const { cart, setCart } = useCartStore();
  const router = useRouter();

  const handleAddToCartButtonClick = (e: React.MouseEvent)=>{
    e.stopPropagation();
    handleAddToCart({id, cart, setCart});
  }

  const handleBuyNowButtonClick = (e: React.MouseEvent)=>{
    e.stopPropagation();
    handleBuyNow({id, cart, setCart, router});
  }

  return (
    <div className="flex flex-col border border-(--border) rounded-xl overflow-hidden p-4 pb-6 grow hover:border-(--primary) duration-200 group cursor-pointer"
    onClick={()=> router.push('/shop/'+id)}
    >
      <figure className="flex justify-center items-center mb-4 rounded-md overflow-hidden">
        <Image
          src={product_image}
          width={300}
          height={300}
          alt={product_name+" "+"image"}
          className="object-cover group-hover:scale-110 duration-200"
        />
      </figure>

      <div className="flex flex-col mb-2 items-center gap-2">
        <h2 className="md:text-xl text-center">{product_name}</h2>
        <p className="text-(--subtext) text-xs ">Rating: {rating}/5</p>
        <p className="">${offer_price}</p>
      </div>

      <div className="flex gap-2 mt-auto">
        <button className="button-secondary h-10 flex-1 justify-center items-center rounded-full!"
        onClick={(e)=> handleAddToCartButtonClick(e)}
        >
          <ShoppingCartIcon size={20} weight="light" />
        </button>
        <button className="button-secondary rounded-full! justify-center items-center h-10 flex-1"
        onClick={(e)=> handleBuyNowButtonClick(e)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
