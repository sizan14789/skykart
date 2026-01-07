import Slider from "@/ui/(buyer)/components/homepage/Slider";
import ShopComponent from "@/ui/(buyer)/components/homepage/ShopComponent";
import Categories from "@/ui/(buyer)/components/homepage/Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopUp",
  description: "An E-commerce app",
};

export default function Home() {
  return (
    <div className="shell grow">
      <div className="core flex flex-col items-center">
        <Slider />
        <ShopComponent />
        <Categories />
      </div>
    </div>
  );
}
