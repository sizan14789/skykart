import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="shell mt-auto border-t-(--border) border-t ">
      <div className="core flex flex-col">
        <div className="flex justify-around py-14 pb-20 flex-col md:flex-row gap-10 md:gap-20">
          <div className="flex flex-1 flex-col gap-2">
            <Link
              href="/"
              className="font-heading text-xl md:text-2xl font-semibold "
            >
              ShopUp
            </Link>
            <p className="dimmed-text text-xs! mb-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              cumque porro voluptates similique, perferendis iste tempora est
              architecto ut excepturi sed enim, minima dolorum impedit rem
              repellendus explicabo id neque.
            </p>

            <h2 className="font-semibold text-(--subtext)">Socials</h2>
            <div className="flex">
              <Link
                href="https://github.com/sizan14789"
                target="_blank"
                className="button-rounded h-11 aspect-square"
              >
                <GithubLogoIcon size={26} />
              </Link>
            </div>
          </div>

          <div className="flex flex-1 gap-40">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl">Navigation</h2>
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
              <h2 className="text-xl">Contacts</h2>
              <p className="text-(--subtext) text-xs ">01925790529</p>
              <a
                className="text-(--subtext) text-xs hover:text-(--secondary) duration-200"
                href="mailto:sizanalt@gmail.com"
              >
                sizanalt@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-(--subtext) text-xs border-t  border-t-(--border) items-center py-3">
        © 2025 Sizan Molla. All
        rights reserved.
      </div>
    </div>
  );
}
