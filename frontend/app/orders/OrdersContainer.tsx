"use client";

import Link from "next/link";
import { useState } from "react";
import OrdersItemCard from "./OrdersItemCard";

export default function OrdersContainer({
  ordersDetailsInfo,
}: {
  ordersDetailsInfo: OrderType[];
}) {
  const [ordersDetails, setOrdersDetails] =
    useState<OrderType[]>(ordersDetailsInfo);

  // cancel order
  const handleCancelFromOrders = (id: number) => {
    const updatedOrdersDetails = ordersDetails.filter((each) => {
      return each.id !== id;
    });
    setOrdersDetails(updatedOrdersDetails);
  };

  if (ordersDetails.length === 0) {
    return (
      <div className="grow flex justify-center my-6">
        <h2 className="text-(--subtext) text-sm">
          No orders. Visit the{" "}
          <Link href="/shop" className="text-(--highlight) ">
            shop
          </Link>{" "}
          to order items
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="p-2 grid grid-cols-3  mb-4 font-semibold ">
        <h2 className="  flex justify-center ">Product</h2>
        <p className="flex justify-center ">Subtotal</p>
        <p className="flex justify-center ">Status</p>
      </div>

      {ordersDetails.map((each: OrderType) => {
        return <OrdersItemCard data={each} key={each.id} />;
      })}
    </>
  );
}
