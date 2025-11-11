import Slider from "@/ui/components/homepage/Slider"; 
import ShopComponent from "@/ui/components/homepage/ShopComponent";
import Smartphones from "@/ui/components/homepage/Smartphones";

export default function Home() {
  return (
    <div className="shell grow">
      <div className="core flex flex-col items-center">
        <Slider />
        <ShopComponent />
        <Smartphones />
      </div>
    </div>
  );
}
