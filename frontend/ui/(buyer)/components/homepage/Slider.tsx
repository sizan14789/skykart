"use client";

import Image from "next/image";
import Link from "next/link";
import sliderInfo from "@/assets/slider.json";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <div className="w-full my-10 mt-5 lg:mt-10">
      <div className="overflow-hidden rounded-md">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          speed={500}
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
        >
          {sliderInfo.map(
            ({
              id,
              offer,
              headline,
              primaryButton,
              primary_link,
              secondaryButton,
              secondary_link,
              image,
            }) => {
              return (
                <SwiperSlide key={id}>
                  <div className="bg-(--slider) py-8 px-8 sm:px-20 flex flex-col-reverse gap-10 lg:gap-14 md:flex-row items-center h-128 lg:h-96">
                    <div className=" flex-1 ">
                      <p className="text-(--primary)">{offer}</p>
                      <h2 className="text-2xl md:text-[2rem] lg:text-[2.5rem] leading-12 font-bold mb-6 ">
                        {headline}
                      </h2>
                      <div className="flex gap-4 items-center ">
                        <Link href={primary_link}>
                          <button className="button-primary h-12 w-32 flex justify-center items-center">
                            {primaryButton}
                          </button>
                        </Link>
                        <Link href={secondary_link}>
                          <button className="button-secondary h-12 w-32 flex justify-center items-center">
                            <p>{secondaryButton}</p>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <figure className="overflow-hidden rounded-xl flex aspect-square max-w-70">
                      <Image
                        src={image}
                        width={1000}
                        height={1000}
                        alt="slide-1"
                        className="object-cover overflow-hidden  text-[.6rem]"
                      />
                    </figure>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </div>
    </div>
  );
}
