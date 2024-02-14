import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import useFetchData from "../../hooks/useFetchData";
import "./Recruters.css";
import { RecruterType } from "../../types/types.portal";
import React from "react";
import { motion } from "framer-motion";

const Recruters: React.FC<{ sliderparamiter?: number }> = ({
  sliderparamiter,
}) => {
  const [isPending, recruterData] = useFetchData("companyList");
  if (isPending) {
    return;
  }

  const sliderPerview = sliderparamiter ? sliderparamiter : 5.5;
  return (
    <div id="test1" className="element">
      {recruterData?.length > 0 && (
        <>
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-semibold">
                Our Top <span className="customFocus font-bold">Recruters</span>
              </h1>
            </div>
            <Swiper
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: sliderPerview,
                  spaceBetween: 80,
                },
              }}
              className="recruters-swiper"
            >
              {(recruterData as RecruterType[])?.map((data, index: number) => {
                return (
                  <div key={index}>
                    {data.image && (
                      <SwiperSlide>
                        <motion.img
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 1,
                            delay: index * 0.2,
                            ease: "easeInOut",
                          }}
                          src={data?.image}
                          alt=""
                        />
                      </SwiperSlide>
                    )}
                  </div>
                );
              })}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Recruters;
