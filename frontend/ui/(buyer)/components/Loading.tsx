import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

export default function Loading() {
  return (
    <div className="flex justify-center items-center grow">
      <TailChase size="40" speed="1.75" color="#0c2ce2" />
    </div>
  );
}
