"use client";

import useCartStore from "@/context/CartStore";
import { useRouter } from "next/navigation";
import { handleAddToCart, handleBuyNow } from "@/lib/cartLib";
import { useUserStore } from "@/context/UserStore";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function CartAndBuy({
  id,
  stockAvailable,
}: {
  id: number;
  stockAvailable: number;
}) {
  const [stockAddCount, setStockAddCount] = useState<number>(1);
  const { cart, setCart } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();

  const addToCart = async () => {
    if (user.username) {
      const res = await handleAddToCart({
        amount: stockAddCount,
        id,
        cart,
        setCart,
      });
      if (res) {
        setStockAddCount(1);
        toast.success("Added to cart");
      }
    } else toast.error("Not Logged in");
  };

  const buyNow = async () => {
    if (user.username) {
      const res = await handleBuyNow({
        amount: stockAddCount,
        id,
        cart,
        setCart,
        router,
      });
      if (res) {
        setStockAddCount(1);
        toast.success("Added to cart");
      }
    } else toast.error("Not Logged in");
  };

  const changeStockAddCOunt = (i: number) => {
    if (stockAddCount + i <= stockAvailable && stockAddCount + i > 0) {
      setStockAddCount((prev) => prev + i);
    }
  };

  return (
    <>
      <div className="flex h-10 w-32 my-3">
        <button
          className="cursor-pointer flex-1 flex justify-center items-center border border-(--border-button) hover:text-(--primary) active:scale-90 "
          onClick={() => changeStockAddCOunt(-1)}
        >
          <MinusIcon size={14} />
        </button>
        <p className=" flex-1 flex justify-center items-center  border-y border-y-(--border-button) text-xs ">
          {stockAddCount}
        </p>
        <button
          className="cursor-pointer flex-1 flex justify-center items-center border border-(--border-button) hover:text-(--primary) active:scale-90 "
          onClick={() => changeStockAddCOunt(1)}
        >
          <PlusIcon size={14} />
        </button>
      </div>
      <div className="flex gap-4 my-b ">
        <button
          className="button-secondary h-12 w-44 justify-center items-center"
          onClick={addToCart}
        >
          add to cart
        </button>
        <button
          className="button-primary justify-center items-center h-12 w-44 "
          onClick={buyNow}
        >
          Buy Now
        </button>
      </div>
    </>
  );
}
