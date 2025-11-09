"use client";

import Image from "next/image";
import Link from "next/link";

export default function OrderHero({ data }: { data: SingleOrderType }) {
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
  } = data;

  return (
    <div className="w-full flex flex-col gap-8 md:flex-row">
      <figure className="flex-1 flex justify-center px-10 items-start">
        <Image
          src={product_image}
          height={800}
          width={800}
          alt={product_name + " image"}
          className="rounded-2xl overflow-hidden object-cover"
        />
      </figure>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-4xl">{product_name}</h2>
        <p className="dimmed-text ">{description}</p>

        <div className="flex gap-4 items-center mb-2">
          <p className="text-2xl">
            <span className="text-(--primary)">$</span>
            {offer_price}
          </p>
          <p className="line-through">${offer_price}</p>
        </div>

        <p className="dimmed-text my-2">Status: {order_status}</p>

        <div className="mb-4">calculations</div>

        <h2 className="text-xl">Recipient Info:</h2>
        <div className="flex flex-col gap-1 mb-3">
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
          {order_status === "pending" ? (
            <button className="button-secondary h-12 w-36 flex justify-center items-center">
              Cancel Order
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
