import Slider from "@/ui/components/homepage/Slider"; 
import ShopComponent from "@/ui/components/homepage/ShopComponent";

export default function Home() {
  return (
    <div className="shell grow">
      <div className="core flex flex-col items-center">
        <Slider />
        <ShopComponent />
        <div className="w-full my-10">Categories</div>
      </div>
    </div>
  );
}
