import { getUser } from "@/lib/initialLoadLib";
import {
  HeartStraightIcon,
  ShoppingCartSimpleIcon,
  TruckIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function User() {
  const user = await getUser();

  if (!user) redirect("/");

  const { username, email, role } = user;

  return (
    <div className="shell mt-6 mb-30 sm:my-50">
      <div className="core flex flex-col sm:flex-row gap-6 sm:gap-16">
        <figure className="flex justify-center overflow-hidden rounded-2xl flex-1">
          <Image
            src="https://i.ibb.co.com/HpxCbTJg/custom-filename.png"
            alt="user image"
            width={300}
            height={300}
            className="object-cover rounded-2xl"
          />
        </figure>
        <div className="flex flex-col items-center flex-1 sm:items-start">
          <h2 className="text-4xl">@{username}</h2>
          <p className="dimmed-text" >{email}</p>
          <p className="my-3">Logged in as <span className="text-(--highlight)"> {role[0]} </span> </p>
          <div className="flex gap-2 mb-3">
            <Link href="/cart" className="button-rounded h-12 aspect-square flex justify-center items-center">
              <ShoppingCartSimpleIcon size={24} />
            </Link>

            <Link href="/wishlist" className="button-rounded h-12 aspect-square flex justify-center items-center">
              <HeartStraightIcon size={24} />
            </Link>
            <Link href="/orders" className="button-rounded h-12 aspect-square flex justify-center items-center">
              <TruckIcon size={24} />
            </Link>
          </div>
          
          {/* todo add modal here to logout or update info */}
          <div className="flex gap-4">
            <button className="button-primary h-12 w-32 flex justify-center items-center">
            Update Info
          </button><button className="button-secondary h-12 w-32 flex justify-center items-center">
            Logout
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
