import { getSessionid, getUser } from "@/lib/initialLoadLib";
import WishlistContainer from "./WishlistContainer";
import Link from "next/link";

const getList = async (sessionid: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/wishlist`, {
      method: "get",
      headers: {
        Cookie: `sessionid=${sessionid}`,
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function WishList() {
  const user = await getUser();

  const sessionid = await getSessionid();

  let list = [];
  if (sessionid) list = await getList(sessionid);

  return (
    <div className="shell my-6 mb-24">
      <div className="core">
        <div className="flex flex-col w-full">
          <p className="text-sm text-(--subtext) flex items-center gap-1 mb-4">
            <Link href="/">Home</Link> / <Link href="/wishlist">Wishlist</Link>
          </p>
          {user ? (
            <WishlistContainer list={list} />
          ) : (
            <div className="h-20 flex justify-center items-center">
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
