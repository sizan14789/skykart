import { getProductsByCategory } from "@/lib/CategoryMethods";
import Error from "../Error";
import SliderForCategories from "./SliderForCategories";
import Link from "next/link";

export default async function SingleCategory({
  name,
  tag,
}: {
  name: string;
  tag: string;
}) {
  const dataPerCategory = await getProductsByCategory(tag);

  if (!dataPerCategory)
    return (
      <div className="shell ">
        <div className="core flex flex-col">
          <Error />
        </div>
      </div>
    );

  return (
    <div className="shell my-4 md:my-6 ">
      <div className="core flex flex-col">
        <div className="flex justify-between pb-4">
          <h2 className="flex items-center text-(--subtext) text-[1.125rem] font-semibold ">
            {name}
          </h2>
          <Link
            href={"/shop?category="+tag}
            className="button-primary h-10 w-28 flex justify-center items-center"
          >
            See More
          </Link>
        </div>
        <SliderForCategories data={dataPerCategory} tag={tag} />
      </div>
    </div>
  );
}
