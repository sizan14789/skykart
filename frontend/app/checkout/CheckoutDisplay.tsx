'use client'

import Link from "next/link";
import CheckoutItemCard from "./CheckoutItemCard";
import { useState } from "react";

export default function CheckoutDisplay({
  data,
}: {
  data: CartItemType[];
}) {
  const [ checkoutDetails, setCheckoutDetails ] = useState<CartItemType []>(data)

  const handleQuantityChange = (id: number, amount: number) => {
    const updatedCheckoutDetails: CartItemType[] = checkoutDetails.map(
      (each: CartItemType) => {
        const newItem: CartItemType = { ...each };
        if (newItem.id === id) {
          if (!(amount === -1 && newItem.quantity === 1)) {
            newItem.quantity = newItem.quantity + amount;
          }
        }
        return newItem;
      }
    );
    setCheckoutDetails(updatedCheckoutDetails);
  };

  // total amount
  const getTotal = () => {
    let total = 0;
    checkoutDetails.forEach((each) => {
      total += each.offer_price * each.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="p-2 flex justify-around mb-4 font-semibold ">
        <h2 className="">
          Product
        </h2>
        <h2>Quantity</h2>
        <h2>Subtotal</h2>
      </div>

      {checkoutDetails.map((each: CartItemType) => {
        return <CheckoutItemCard data={each} key={each.id} handleQuantityChange={handleQuantityChange} />
      })}

      <div className="py-8 px-2 flex justify-between mb-4 font-semibold ">
        <p className="">Total</p>
        <p className="mr-6">
          ${getTotal()}
        </p>
      </div>
      <Link href="/cart" className="button-secondary h-14 w-40 flex justify-center items-center" >Edit Cart</Link>
    </div>
  );
}
