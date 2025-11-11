import { getProductsByCategory } from "@/lib/CategoryMethods";
import Error from "../Error";
import SliderForCategories from "./SliderForCategories";
import Link from "next/link";

export default async function Smartphones() {
  const smartphones = await getProductsByCategory("tech");
  console.log(smartphones);

  if (!smartphones)
    return (
      <div className="shell my-10">
        <div className="core flex flex-col">
          <Error />
        </div>
      </div>
    );

  return (
    <div className="shell  my-10">
      <div className="core flex flex-col">
        <div className="flex justify-between pb-4">
          <h2 className="flex items-center text-xl">Smartphones</h2>
          <Link href={'/shop?category=tech'} className="button-primary h-10 w-28 flex justify-center items-center">See More</Link>
        </div>
        <SliderForCategories data={smartphones} />
      </div>
    </div>
  );
}
