import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { Image } from "cloudinary-react";
import { CLOUDINARY_REGEX } from "../../helpers/cloudinaryRegex";

SwiperCore.use([Pagination]);
export default function ImageCourasel({ imageUrls, cardWidth }) {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 500px)").matches
  );
  const handler = (e) => setMatches(e.matches);
  useEffect(() => {
    window.matchMedia("(min-width: 500px)").addListener(handler);
    return () => {
      window.matchMedia("(min-width: 500px)").removeListener(handler);
    };
  }, []);
  return (
    <div className="col-span-2">
      <Swiper
        tag="section"
        id="main"
        pagination={{ clickable: true }}
        wrapperTag="ul"
        spaceBetween={50}
        slidesPerView={1}
      >
        {imageUrls.map((url, i) => (
          <SwiperSlide tag="li" key={`Slide-${i}`}>
            <div style={{ width: `${matches ? cardWidth : ""}` }}>
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                className="object-cover object-center rounded-l-lg sm:rounded-t-lg sm:rounded-bl-none sm:p-1"
                dpr="auto"
                responsive
                width="auto"
                crop="scale"
                publicId={CLOUDINARY_REGEX.exec(url)[4]}
              ></Image>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
