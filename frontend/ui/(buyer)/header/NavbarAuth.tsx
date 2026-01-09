import useCartStore from "@/context/CartStore";
import { useUserStore } from "@/context/UserStore";
import { userType } from "@/types/UserType";
import {
  GearIcon,
  ShoppingCartSimpleIcon,
  SignOutIcon,
  TruckIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NavbarAuth({ user }: { user: userType }) {
  const [authModal, setAuthModal] = useState<boolean>(false);
  const router = useRouter();
  const { setCart } = useCartStore();
  const { setUser } = useUserStore();

  const handleRedirectClick = (path: string) => {
    setAuthModal(false);
    router.push("/" + path);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`);
      if (res.status === 200) {
        setAuthModal(false);
        toast.success("Logged out");
        setCart({});
        setUser({});
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
    }
  };

  const handleSwitchToSeller = () => {
    setCookie("mode", "seller");
    router.push("/storage");
  };

  return (
    <>
      <div className="flex gap-2 md:gap-4 items-center relative">
        {user ? (
          <button
            onClick={() => setAuthModal(true)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <UserCircleIcon size={22} weight="thin" />
            <p>{user?.username}</p>
          </button>
        ) : (
          <>
            <button className="cursor-pointer button-primary h-8 w-20 md:h-10 md:w-32">
              <Link
                href="/login"
                className="grow flex justify-center items-center rounded-md"
              >
                Log in
              </Link>
            </button>

            <button className="cursor-pointer button-secondary h-8 w-20 md:h-10 md:w-32">
              <Link
                href="/signup"
                className="grow flex justify-center items-center"
              >
                Sign up
              </Link>
            </button>
          </>
        )}
        <div
          className={`${
            authModal ? "flex flex-col" : "hidden"
          } border border-(--border) bg-(--bg) absolute top-8 right-0 rounded-xl text-xs min-w-62 z-49 overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-14 w-full px-6  flex justify-center items-center gap-4 bg-(--bg) hover:brightness-90 duration-200 ">
            <UserCircleIcon size={30} weight="thin" />
            <p className="text-[1rem]">{user?.username}</p>
          </div>
          <button
            onClick={() => handleRedirectClick("cart")}
            className="cursor-pointer h-12 w-full px-6 border-t border-t-(--border) flex justify-center items-center gap-2 bg-(--bg) hover:brightness-90 duration-200 active:scale-90"
          >
            <ShoppingCartSimpleIcon size={20} />
            Cart
          </button>
          <button
            onClick={() => handleRedirectClick("orders")}
            className="cursor-pointer h-12 w-full px-6 border-t border-t-(--border) flex justify-center items-center gap-2 bg-(--bg) hover:brightness-90 duration-200 active:scale-90"
          >
            <TruckIcon size={20} /> Orders
          </button>
          <button
            onClick={() => handleRedirectClick("user")}
            className="cursor-pointer h-12 w-full px-6 border-t border-t-(--border) flex justify-center items-center gap-2 bg-(--bg) hover:brightness-90 duration-200 active:scale-90"
          >
            <GearIcon size={20} /> Manage Account
          </button>
          {user && user.role.includes("seller") ? (
            <button
              onClick={handleSwitchToSeller}
              className="cursor-pointer h-12 w-full px-6 border-t border-t-(--border) flex justify-center items-center gap-2 bg-(--bg) hover:brightness-90 duration-200 active:scale-90"
            >
              Switch To Seller Mode
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={handleLogout}
            className="cursor-pointer h-12 w-full px-6 border-t border-t-(--border) flex justify-center items-center gap-2 bg-(--bg) hover:brightness-90 duration-200 active:scale-90"
          >
            <SignOutIcon size={20} /> Logout
          </button>
        </div>
      </div>
      <div
        className={`${
          authModal ? "flex flex-col" : "hidden"
        } h-svh w-svw absolute top-0 right-0`}
        onClick={() => setAuthModal(false)}
      ></div>
    </>
  );
}
