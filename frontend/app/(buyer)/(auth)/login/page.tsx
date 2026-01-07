import LoginForm from "./LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log In page of ShopUp",
};

export default function Login() {
  return (
    <div className="shell flex grow my-50">
      <div className="core grow flex flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
