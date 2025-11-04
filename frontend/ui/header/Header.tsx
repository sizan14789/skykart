import Link from "next/link";
import Navbar from "./Navbar";
import NavButton from "./NavButton";
import { getUser } from "@/lib/getuser";
import { userType } from "@/types/UserType";

export default async function Header({ theme }: { theme: string }) {
  const user:userType = await getUser();
  console.log(user)

  return (
    <div className="shell sticky bg-(--bg) top-0 border-b border-b-(--border)  z-50 ">
      <div className="flex items-center min-h-14 md:min-h-18 xl:min-h-22 core pl-1! md:pl-4!">
        <div className="flex md:gap-2 items-center lg:mr-8">
          <NavButton />
          <Link href="/" className="font-heading text-xl md:text-2xl lg:text-3xl font-light">
            SkyKart
          </Link>
        </div>

        <Navbar theme={theme.toString()} user={user} />
      </div>
    </div>
  );
}
