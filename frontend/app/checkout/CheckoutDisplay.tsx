import Link from "next/link";
import CheckoutItemCard from "./CheckoutItemCard";

export default function CheckoutDisplay({
  checkoutDetails,
}: {
  checkoutDetails: CartItemType[];
}) {
  // total amount
  const getTotal = () => {
    let total = 0;
    checkoutDetails.forEach((each) => {
      total += each.offer_price * each.quantity;
    });
    return total;
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="p-2 flex justify-between mb-4 font-semibold ">
        <h2 className="">
          Product
        </h2>
        <p className="">Subtotal</p>
      </div>

      {checkoutDetails.map((each: CartItemType) => {
        return <CheckoutItemCard data={each} key={each.id} />
      })}

      <div className="py-8 px-2 flex justify-between mb-4 font-semibold ">
        <p className="">Total</p>
        <p className="">
          ${getTotal()}
        </p>
      </div>
      <Link href="/cart" className="button-secondary h-14 w-40 flex justify-center items-center" >Edit Cart</Link>
    </div>
  );
}
