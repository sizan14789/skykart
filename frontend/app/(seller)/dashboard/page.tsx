import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard of ShopUp",
};

export default function Dashboard() {
  return (
    <div className="shell grow">
      <div className="core flex flex-col items-center"></div>
    </div>
  );
}
