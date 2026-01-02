"use client";

import { userType } from "@/types/UserType";
import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// todo ImageSection
export default function ImageSection({ user }: { user: userType }) {
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;

    const file = e.target?.files[0];

    if (!file.type.startsWith("image")) {
      toast.error("Upload an image please");
      return;
    }

    let compressedFile;
    try {
      compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        useWebWorker: true,
      });
    } catch (error) {
      toast.error("Error during compression");
      return;
    }

    const formData = new FormData();
    formData.append("file", compressedFile);

    toast.promise(
      async () => {
        const res = await fetch(`/api/user/changedp`, {
          method: "post",
          body: formData,
        });
        return res;
      },
      {
        loading: "Uploading",
        success: () => {
          router.refresh();
          return "Uploaded";
        },
        error: "Could not upload",
      }
    );
  };

  return (
    <figure className=" relative flex justify-center overflow-hidden rounded-2xl flex-1 py-6">
      <div className="relative overflow-hidden rounded-full group">
        <Image
          src={user.image}
          alt="user image"
          width={300}
          height={300}
          className="object-cover rounded-full text-[.6rem] cursor-pointer aspect-square "
        />
        <label
          className=" h-full w-full flex justify-center items-center top-0 left-0 rounded-full absolute z-23 group-hover:bg-gray-800/50 cursor-pointer duration-250 ease-in-out"
          htmlFor="image"
        >
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <div className=" h-full w-full flex justify-center items-center top-0 left-0 rounded-full absolute z-20 translate-y-full group-hover:translate-y-0 cursor-pointer duration-250 ease-in-out">
          <UploadSimpleIcon size={56} />
        </div>
      </div>
    </figure>
  );
}
