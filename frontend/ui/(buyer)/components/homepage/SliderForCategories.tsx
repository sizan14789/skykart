"use client";

import { ProductCardType } from "@/types/ProductsTypes";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/app/(buyer)/shop/ProductCard";
import { Autoplay, Navigation } from "swiper/modules";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export default function SliderForCategories({
  data,
  tag,
}: {
  data: ProductCardType[];
  tag: string;
}) {
  return (
    <div className="relative">
      <button
        className={`swiper-button-prev-${tag} absolute h-20 top-1/2 -translate-y-1/2 z-10 bg-[#dddddd52] text-black active:scale-90 opacity-50 rounded-sm  flex justify-center items-center cursor-pointer left-0!`}
      >
        <CaretLeftIcon size={36} />
      </button>
      <button
        className={`swiper-button-next-${tag} absolute h-20 top-1/2 -translate-y-1/2 z-10 bg-[#dddddd52]  text-black active:scale-90 opacity-50 rounded-sm  flex justify-center items-center cursor-pointer right-0!`}
      >
        <CaretRightIcon size={36} />
      </button>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: `.swiper-button-next-${tag}`,
          prevEl: `.swiper-button-prev-${tag}`,
        }}
        spaceBetween={20}
        slidesPerView="auto"
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={500}
        className=" "
      >
        {data.map((each) => {
          return (
            <SwiperSlide
              key={each.id}
              className="max-w-56 min-w-56  min-h-83.75"
            >
              <ProductCard data={each} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
