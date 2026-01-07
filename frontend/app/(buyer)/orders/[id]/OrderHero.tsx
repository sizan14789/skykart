"use client";

import { ArchiveIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { format, formatDistance } from 'date-fns'

export default function OrderHero({ data }: { data: SingleOrderType }) {
  const [order, setOrder] = useState<SingleOrderType>(data);
  const {
    id,
    product_name,
    product_image,
    product_id,
    address,
    phone,
    full_name,
    message,
    description,
    offer_price,
    quantity,
    subtotal,
    order_status,
    created_at,
  } = order;
  const router = useRouter();

  const formattedDate = format(new Date(created_at), "dd-MM-yyyy")
  const formattedDistance = formatDistance(new Date(created_at), new Date(), { addSuffix: true })

  // cancel order
  const handleCancel = async () => {
    const toastid = toast.loading("Cancelling");
    try {
      const res = await fetch(
        `/api/orders/cancel/${id}`,
        {
          method: "post",
          credentials: "include",
        }
      );

      if (res.status === 201) {
        setOrder((prev) => ({ ...prev, order_status: "Cancelled" }));
        toast.success("Order Cancelled", { id: toastid });
      } else {
        const data = await res.json();
        toast.error(data.message, { id: toastid });
      }
    } catch (error) {
      console.error(error);
      toast.error("Cancel Failed", { id: toastid });
    }
  };

  // archive Order
  const handleArchive = async () => {
    const toastid = toast.loading("Archiving");

    try {
      const res = await fetch(
        `/api/orders/archive/${id}`,
        {
          method: "post",
          credentials: "include",
        }
      );

      if (res.status === 201) {
        setOrder((prev) => ({ ...prev, order_status: "Archived" }));
        toast.success("Order Archived", { id: toastid });
      } else {
        const data = await res.json();
        toast.error(data.message, { id: toastid });
      }
    } catch (error) {
      console.error(error);
      toast.error("Archiving Failed", { id: toastid });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 md:flex-row">
      <figure className="flex-1 flex justify-center px-10 items-start">
        <Image
          src={product_image}
          height={800}
          width={800}
          alt={product_name + " image"}
          className="rounded-2xl overflow-hidden object-cover  text-[.6rem]"
        />
      </figure>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-4xl mb-1">{product_name}</h2>
        <p className="dimmed-text ">{description}</p>

        <div className="flex gap-4 items-center mb-2">
          <p className="text-2xl">
            <span className="text-(--primary)">$</span>
            {offer_price}
          </p>
          <p className="line-through">${offer_price}</p>
        </div>

        <h2 className="text-xl mt-6">Order Info</h2>
        <p className="dimmed-text ">Order Status: {order_status}</p>

        <div className="flex max-w-40 justify-between border-b border-(--border-button) ">
          <div className="flex items-end">
          </div>
          <div>
            <p className="dimmed-text ">${offer_price}</p>
            <p className="dimmed-text text-end">x{quantity}</p>
          </div>
        </div>

        <div className="flex max-w-40 justify-between mb-2">
          <div className="flex items-end">
            <p className="dimmed-text">Total: </p>
          </div>
          <div>
            <p className="dimmed-text font-bold ">${subtotal}</p>
          </div>
        </div>
        <p className="dimmed-text mb-8 ">Order Time: {formattedDistance} ({formattedDate})</p>


        <h2 className="text-xl">Recipient Info:</h2>
        <div className="flex flex-col gap-1 mb-6">
          <p className="dimmed-text ">Recipient: {full_name}</p>
          <p className="dimmed-text ">Phone: {phone}</p>
          <p className="dimmed-text ">Address: {address}</p>
          {message ? <p className="dimmed-text ">Message: {message}</p> : <></>}
        </div>

        <div className="flex gap-4 ">
          <Link
            href={"/shop/" + product_id}
            className="button-primary h-12 w-36 flex justify-center items-center"
          >
            View In Shop
          </Link>
          {order_status === "Pending" ? (
            <button
              className="button-secondary h-12 w-36 flex justify-center items-center"
              onClick={handleCancel}
            >
              Cancel Order
            </button>
          ) : (
            <></>
          )}
          {order_status === "Cancelled" || order_status === "Completed" ? (
            <button
              className="button-secondary h-12 w-36 flex justify-center items-center text-xs! gap-1"
              onClick={handleArchive}
            >
              <ArchiveIcon size={20} weight="light" />
              <p>Archive</p>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
