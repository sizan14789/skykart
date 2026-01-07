import { ArchiveIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OrdersItemCard({
  data,
  handleCancelStateUpdate,
  handleArchiveStateUpdate,
}: {
  data: OrderType;
  handleCancelStateUpdate: (id: number) => void;
  handleArchiveStateUpdate: (id: number) => void;
}) {
  const {
    id,
    offer_price,
    order_status,
    product_id,
    product_image,
    product_name,
    quantity,
    subtotal,
  } = data;

  // cancel Orders
  const handleCancel = async () => {
    try {
      const res = await fetch(`/api/orders/cancel/${id}`, {
        method: "post",
        credentials: "include",
      });

      if (res.status === 201) {
        handleCancelStateUpdate(id);
        toast.success("Order Cancelled");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Cancel Failed");
    }
  };

  // archive Orders
  const handleArchive = async () => {
    try {
      const res = await fetch(`/api/orders/archive/${id}`, {
        method: "post",
        credentials: "include",
      });

      if (res.status === 201) {
        handleArchiveStateUpdate(id);
        toast.success("Order Archived");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Archive Failed");
    }
  };

  return (
    <div className="grid grid-cols-3 py-4 border-b-(--border) border-b bg-(--bg) hover:brightness-95 duration-200 ">
      <Link
        href={"/shop/" + product_id}
        className=" flex items-center gap-4 flex-col lg:flex-row px-2 cursor-pointer"
      >
        <Image
          height={100}
          width={100}
          alt={product_name + " image in cart"}
          src={product_image}
          className="object-cover rounded-lg max-w-20 lg:max-w-28 text-[.6rem] "
        />
        <div className="flex gap-1 md:gap-2 flex-col  w-full">
          <h2 className=" text-center lg:text-start">{product_name}</h2>
        </div>
      </Link>

      <p className="flex justify-center text-sm items-center">
        ${offer_price}x{quantity}=
        <span className="font-semibold">${subtotal}</span>
      </p>

      <div className="flex justify-center flex-col items-center gap-2">
        <p className="text-xs mb-2">{order_status}</p>
        <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
          <Link
            href={"/orders/" + id}
            className="button-primary h-10 w-24 flex justify-center items-center text-xs!"
          >
            See Details
          </Link>
          {order_status === "Pending" ? (
            <button
              className="button-secondary h-10 w-24 flex justify-center items-center text-xs! "
              onClick={handleCancel}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
          {order_status === "Cancelled" || order_status === "Completed" ? (
            <button
              className="button-secondary h-10 w-24 flex justify-center items-center text-xs! gap-1"
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
