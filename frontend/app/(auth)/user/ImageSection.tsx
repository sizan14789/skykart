import Image from "next/image";

export default function ImageSection() {
  return (
    <figure className="flex justify-center overflow-hidden rounded-2xl flex-1">
      <Image
        src="https://i.ibb.co.com/HpxCbTJg/custom-filename.png"
        alt="user image"
        width={300}
        height={300}
        className="object-cover rounded-full text-[.6rem] p-6 cursor-pointer"
      />
    </figure>
  );
}
