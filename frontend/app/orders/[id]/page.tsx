import { redirect } from "next/navigation";
import { soloProductType } from "@/types/ProductsTypes";
import { getSessionid } from "@/lib/initialLoadLib";
import OrderHero from "./OrderHero";

const getOrderData = async (id: string, sessionid: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${id}`,
      {
        method: "GET",
        headers: {
          Cookie: `sessionid=${sessionid}`,
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const id: string = (await params)?.id;
  const sessionid = await getSessionid();

  if (!sessionid) return <></>;

  const orderData = await getOrderData(id, sessionid);

  console.log(orderData);

  return (
    <div className="shell mb-20 grow flex mt-20">
      <div className="core grow flex flex-col">
        <OrderHero data={orderData} />
      </div>
    </div>
  );
}
