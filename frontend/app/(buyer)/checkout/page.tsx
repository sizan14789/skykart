import { getSessionid, getUser } from "@/lib/initialLoadLib";
import CheckoutDisplay from "./CheckoutDisplay";
import CheckoutForm from "./CheckoutForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { FolderStructure } from "@/ui/(buyer)/components/FolderStructure";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page of ShopUp",
};

const getCheckoutItemDetails = async (sessionid: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/cartDetails`, {
      method: "get",
      headers: {
        Cookie: "sessionid=" + sessionid,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Cart() {
  const user = await getUser();
  if (!user) redirect("/");

  const sessionid = await getSessionid();
  let checkoutDetails = [];
  if (typeof sessionid === "string")
    checkoutDetails = await getCheckoutItemDetails(sessionid);

  return (
    <div className="shell flex grow my-10">
      <div className="core grow flex flex-col">
        <FolderStructure
          list={[{ text: "Checkout", url: "checkout" }]}
          margin="mb-4"
        />
        <div className=" flex gap-10 lg:gap-20 flex-col-reverse md:flex-row w-full max-w-280 mx-auto">
          <CheckoutForm />
          <CheckoutDisplay data={checkoutDetails} />
        </div>
      </div>
    </div>
  );
}
