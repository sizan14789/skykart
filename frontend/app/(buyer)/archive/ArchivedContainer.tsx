import OrdersItemCard from "./ArchivedItemCard";

export default function OrdersContainer({
  archivedDetails,
}: {
  archivedDetails: OrderType[];
}) {
  if (archivedDetails.length === 0) {
    return (
      <div className="grow flex justify-center my-6">
        <h2 className="text-(--subtext) text-sm">Nothing in archive</h2>
      </div>
    );
  }

  return (
    <>
      <div className="p-2 grid grid-cols-3  mb-4 font-semibold ">
        <h2 className="flex justify-center ">Product</h2>
        <p className="flex justify-center ">Subtotal</p>
        <p className="flex justify-center ">Status</p>
      </div>

      {archivedDetails.map((each: OrderType) => {
        return <OrdersItemCard data={each} key={each.id} />;
      })}
    </>
  );
}
