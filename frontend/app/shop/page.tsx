import FilterBox from "./Filterbox";
import ProductsSection from "./ProductsSection";

export default function Shop() {
  return (
    <div className="shell mb-20 grow flex">
      <div className="core grow flex flex-col">
        <FilterBox />
        <ProductsSection />
      </div>
    </div>
  );
}
