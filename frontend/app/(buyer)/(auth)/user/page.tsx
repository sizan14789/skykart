import { getUser } from "@/lib/initialLoadLib";
import {
  HeartStraightIcon,
  ShoppingCartSimpleIcon,
  TruckIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutAndUpdate from "./LogoutAndUpdate";
import { Metadata } from "next";
import ImageSection from "./ImageSection";

export const metadata: Metadata = {
  title: "User",
  description: "User page of ShopUp",
};

export default async function User() {
  const user = await getUser();
  if (!user) redirect("/");

  const { username, email, role } = user;

  return (
    <div className="shell mt-6 mb-30 sm:my-50">
      <div className="core flex flex-col sm:flex-row gap-6 sm:gap-16">
        <ImageSection user={user} />
        <div className="flex flex-col items-center flex-1 sm:items-start pt-6">
          <h2 className="text-4xl">@{username}</h2>
          <p className="dimmed-text">{email}</p>
          <p className="my-3">
            Logged in as <span className="text-(--highlight)"> {role[0]} </span>{" "}
          </p>
          <div className="flex gap-2 mb-3">
            <Link
              href="/cart"
              className="button-rounded h-12 aspect-square flex justify-center items-center"
            >
              <ShoppingCartSimpleIcon size={24} />
            </Link>

            <Link
              href="/wishlist"
              className="button-rounded h-12 aspect-square flex justify-center items-center"
            >
              <HeartStraightIcon size={24} />
            </Link>
            <Link
              href="/orders"
              className="button-rounded h-12 aspect-square flex justify-center items-center"
            >
              <TruckIcon size={24} />
            </Link>
          </div>

          <LogoutAndUpdate />
        </div>
      </div>
    </div>
  );
}
