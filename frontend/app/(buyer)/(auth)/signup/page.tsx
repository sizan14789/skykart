import SignupForm from "./SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up page of ShopUp",
};

export default function Signup() {
  return (
    <div className="shell flex grow my-40">
      <div className="core grow flex flex-col">
        <SignupForm />
      </div>
    </div>
  );
}
