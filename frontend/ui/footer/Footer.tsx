import Link from "next/link";

export default function Footer() {
  return (
    <div className="shell border-t border-t-(--border) ">
      <div className="core flex flex-col">
        <div className="flex wrap justify-around py-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-heading text-xl md:text-3xl lg:text-4xl font-light text-(--primary) "
            >
              SkyKart
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl md:text-2xl">Navigation</h2>
            <Link
              className="text-xs text-(--subtext) hover:text-(--secondary) duration-200 "
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-xs text-(--subtext) hover:text-(--secondary) duration-200 "
              href="/shop"
            >
              Shop
            </Link>
            <Link
              className="text-xs text-(--subtext) hover:text-(--secondary) duration-200 "
              href="/categories"
            >
              Categories
            </Link>
            <Link
              className="text-xs text-(--subtext) hover:text-(--secondary) duration-200 "
              href="/cart"
            >
              Cart
            </Link>
            <Link
              className="text-xs text-(--subtext) hover:text-(--secondary) duration-200 "
              href="/orders"
            >
              Orders
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl md:text-2xl">Contacts</h2>
            <p className="text-(--subtext) text-sm " >01925790529</p>
            <a className="text-(--subtext) text-sm hover:text-(--secondary) duration-200"  href="mailto:sizanalt@gmail.com">sizanalt@gmail.com</a>
          </div>
        </div>

        <div className="w-full text-center mb-2 text-(--subtext) text-sm">
          All rights Reserved. &#169; <span className="text-(--secondary)"> Sizan Molla </span> 2025
        </div>
      </div>
    </div>
  );
}
