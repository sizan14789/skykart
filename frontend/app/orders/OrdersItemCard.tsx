import Image from "next/image";

export default function OrdersItemCard({ data }: { data: OrderType }) {
  const {
    id,
    offer_price,
    order_status,
    product_image,
    product_name,
    quantity,
    subtotal,
  } = data;
  return (
    <div className="grid grid-cols-3 py-4 border-b-(--border) border-b bg-(--bg) hover:brightness-95 duration-200 ">
      <div className=" flex items-center gap-4 flex-col lg:flex-row px-2 cursor-pointer">
        <Image
          height={100}
          width={100}
          alt={product_name + " image in cart"}
          src={product_image}
          className="object-cover rounded-lg max-w-20 lg:max-w-28 "
        />
        <div className="flex gap-1 md:gap-2 flex-col  w-full">
          <h2 className=" text-center lg:text-start">{product_name}</h2>
        </div>
      </div>

      <p className="flex justify-center text-sm items-center">
        ${offer_price}x{quantity}=
        <span className="font-semibold">${subtotal}</span>
      </p>

      <div className="flex justify-center flex-col items-center gap-2">
        <p className="text-xs mb-2">{order_status}</p>
        <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
          <button className="button-primary h-10 w-20 flex justify-center items-center text-xs!">
            See Details
          </button>
          {order_status === "Pending" ? (
            <button className="button-secondary h-10 w-20 flex justify-center items-center text-xs! ">
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
