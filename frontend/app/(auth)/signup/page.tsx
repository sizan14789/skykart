import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <div className="shell flex grow">
      <div className="core grow flex flex-col">
        <SignupForm />
      </div>
    </div>
  );
}
