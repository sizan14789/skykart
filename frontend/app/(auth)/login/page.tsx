import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="shell flex grow">
      <div className="core grow flex flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
