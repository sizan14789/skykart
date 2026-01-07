"use client";

import useCartStore from "@/context/CartStore";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function CartComponentHeader() {
  const { cart } = useCartStore();

  function getCount(){
    const count = Object.keys(cart).length;
    return count===0 ? "" : count ;
  }

  return (
    <Link href="/cart" className="active:scale-90 relative">
      <ShoppingCartSimpleIcon size={20} weight="light" />
      <p className="absolute bottom-3 left-full text-sm text-(--highlight) font-semibold ">{getCount()}</p>
    </Link>
  );
}
