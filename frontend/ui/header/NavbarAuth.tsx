import Link from "next/link";

export default function NavbarAuth() {
  return (
    <div className="flex gap-2 md:gap-6 items-center" >
      <button className="button-primary h-8 w-20 md:h-10 md:w-32">
        <Link
          href="#"
          className="grow flex justify-center items-center rounded-md"
        >
          Log in
        </Link>
      </button>

      <button className="button-secondary h-8 w-20 md:h-10 md:w-32">
        <Link href="#" className="grow flex justify-center items-center">
          Sign up
        </Link>
      </button>
    </div>
  );
}
