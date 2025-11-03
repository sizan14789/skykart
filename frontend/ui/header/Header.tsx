import Link from "next/link";
import Navbar from "./Navbar";
import NavButton from "./NavButton";

export default function Header({ theme }: { theme: string }) {
  return (
    <div className="shell sticky top-0 border-b border-b-(--border)">
      <div className="flex items-center min-h-14 md:min-h-18 xl:min-h-22 core pl-1! md:pl-4!">
        <div className="flex md:gap-2 items-center lg:mr-8">
          <NavButton />
          <Link href="/" className="font-heading text-xl md:text-2xl lg:text-3xl font-light">
            SkyKart
          </Link>
        </div>

        <Navbar theme={theme.toString()} />
      </div>
    </div>
  );
}
