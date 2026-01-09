"use client";

import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export default function ProductUploadForm() {
  const [image, setImage] = useState<File | undefined>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) setImage(e.target?.files[0]);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    e.currentTarget.reset();

    // image compression part
    if (!image) return;

    toast.loading("Adding product", { id: "toaster" });

    let compressedFile;
    try {
      compressedFile = await imageCompression(image, {
        maxSizeMB: 0.5,
        useWebWorker: true,
      });
    } catch (error) {
      toast.error("Error during compression", {
        id: "toaster",
      });
      return;
    }
    formdata.append("image", compressedFile);

    setImage(undefined);

    try {
      const res = await fetch(`/api/product`, {
        method: "post",
        body: formdata,
      });
      if (res.status === 201)
        toast.success("Product Added", {
          id: "toaster",
        });
      else {
        const data = await res.json();
        toast.error(data.message, {
          id: "toaster",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error", {
        id: "toaster",
      });
    }
  };

  return (
    <form
      className="my-10 flex flex-col gap-2 w-full max-w-160"
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="image" className="flex justify-center mb-4">
        {image && image.type.startsWith("image") ? (
          <Image
            src={URL.createObjectURL(image)}
            alt="user image"
            width={200}
            height={200}
            className="object-cover rounded-md text-[.6rem] cursor-pointer aspect-square"
          />
        ) : (
          <div className="border w-[200px] h-[200px] flex justify-center items-center rounded-md">
            <UploadSimpleIcon size={52} />
          </div>
        )}
      </label>
      <input
        type="file"
        id="image"
        className="hidden"
        onChange={handleImageChange}
        required
      />

      <label htmlFor="name">Name</label>
      <input type="text" className="input" name="name" required />

      <label htmlFor="description">Description</label>
      <textarea className="input" name="description" rows={5} required />

      <label htmlFor="rating">Rating</label>
      <input type="number" className="input" name="rating" required />

      <div className="flex gap-8">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="input max-w-full"
            required
            name="price"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="offer_price">Offer Price</label>
          <input
            type="number"
            className="input max-w-full"
            name="offer_price"
            required
          />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="brand">Brand</label>
          <input type="text" className="input" name="brand" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="stock">Stock</label>
          <input required type="number" className="input" name="stock" />
        </div>
      </div>

      <label htmlFor="category">Category</label>
      <select className="input max-w-48" name="category">
        <option value="smartphone">Smartphone</option>
        <option value="laptop">Laptop</option>
        <option value="accessories">Accessories</option>
      </select>

      <button
        type="submit"
        className="button-primary mt-2 h-12 w-30 justify-center items-center"
      >
        Upload
      </button>
    </form>
  );
}
