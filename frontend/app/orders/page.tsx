import { cookies } from "next/headers"; 
import { getUser } from "@/lib/initialLoadLib";
import Link from "next/link";
import OrdersContainer from "./OrdersContainer";

const getOrdersDetails = async (sessionid: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
      {
        method: "get",
        headers: {
          Cookie: "sessionid=" + sessionid,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Orders() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get("sessionid")?.value;

  const user = await getUser();

  let ordersDetails = [];
  if (typeof sessionid === "string")
    ordersDetails = await getOrdersDetails(sessionid);

  return (
    <div className="shell flex grow my-10">
      <div className="core grow flex flex-col">
        <h2 className="text-2xl mb-4">Orders</h2>
        <div className="w-full flex flex-col">
          {user ? (
            <OrdersContainer ordersDetailsInfo={ordersDetails} />
          ) : (
            <div className="grow flex justify-center my-6">
              <h2 className="text-(--subtext) text-sm">
                You are not logged in.{" "}
                <Link href="/login" className="text-(--highlight) ">
                  Log in
                </Link>
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
