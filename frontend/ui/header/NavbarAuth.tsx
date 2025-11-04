import { userType } from "@/types/UserType";
import { UserCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function NavbarAuth({ user }: { user: userType }) {
  return (
    <div className="flex gap-2 md:gap-4 items-center ">
      {Object.keys(user).length !== 0 ? (
        <button className="flex gap-2 items-center">
          <UserCircleIcon size={22} weight="thin" />
          <p>{user?.username}</p>
        </button>
      ) : (
        <>
          <button className="button-primary h-8 w-20 md:h-10 md:w-32">
            <Link
              href="/login"
              className="grow flex justify-center items-center rounded-md"
            >
              Log in
            </Link>
          </button>

          <button className="button-secondary h-8 w-20 md:h-10 md:w-32">
            <Link
              href="/signup"
              className="grow flex justify-center items-center"
            >
              Sign up
            </Link>
          </button>
        </>
      )}
    </div>
  );
}
