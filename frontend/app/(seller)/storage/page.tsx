import { Metadata } from "next";
import ProductUploadForm from "./ProductUploadForm";

export const metadata: Metadata = {
  title: "Storage",
  description: "Storage of ShopUp",
};

export default function Storage() {
  return (
    <div className="shell grow">
      <div className="core flex flex-col items-center">
        <ProductUploadForm />
      </div>
    </div>
  );
}
