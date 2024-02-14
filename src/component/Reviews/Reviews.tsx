import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Reviews.css";
import { Pagination } from "swiper/modules";
import useFetchData from "../../hooks/useFetchData";
import { quote } from "../../assets";
import Modal from "../Modal/Modal";
import { saveToDb } from "../api/Api";
import {
  JobPortalContext,
  JobPortalContextType,
} from "../../context/JobPortalProvider";
import { motion } from "framer-motion";
import {
  Any,
  NewReviewData,
  ReviewData,
  ReviewError,
} from "../../types/types.portal";
import toast, { Toaster } from "react-hot-toast";

const Reviews = () => {
  const { newUser, setCount, count } = useContext(
    JobPortalContext
  ) as JobPortalContextType;
  const [isPending, reviewData] = useFetchData(
    "reviews",
    "email",
    newUser?.email || undefined
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = React.useRef(null);
  const [reviewerLocation, setReviewerLocation] = useState("");
  const [reviewImageUrl, setReviewImageUrl] = useState<string | undefined>("");

  const [showModal, setShowModal] = useState(false);
  const [checkUserReview, setCheckUserReview] = useState(false);
  const testimonialModal = true;
  const [reviewError, setReviewError] = useState<ReviewError>({
    name: "",
    email: "",
    review: "",
  });

  const addError = (argument: string) => {
    const newError = { [argument]: argument };
    setReviewError((prev) => ({ ...prev, ...newError }));
  };

  const [newReviewData, setNewReviewData] = useState<NewReviewData>({
    name: "",
    review: "",
    image: "",
    email: "",
  });

  const clearReviewErrorData = () => {
    setReviewError({
      name: "",
      email: "",
      review: "",
    });
  };

  const handleNewReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckUserReview(true);
    const newData = {
      ...newReviewData,
      location: reviewerLocation,
      image: reviewImageUrl,
    };

    if (!newReviewData?.name) {
      addError("name");
      return;
    }
    if (!newReviewData?.email) {
      addError("email");
      return;
    }
    if (!newReviewData?.review) {
      addError("review");
      return;
    }

    const response = await saveToDb(newData, "reviews");

    if (response.acknowledged) {
      setCount(count + 1);
      toast.success(`${newReviewData.name}, your review is accepted`);
      clearAllreviewData();

      setShowModal(false);
    } else {
      toast.error("You have already provided a review");
    }
  };

  type SwiperRef = {
    current: Any;
  };

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    (swiperRef as SwiperRef).current.swiper.slideTo(index);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReviewData({
      ...newReviewData,
      [e.target.name]: e.target.value,
      // location: companyLocation,
    });
    clearReviewErrorData();
  };

  useEffect(() => {
    if (reviewData?.message) {
      setCheckUserReview(true);
    }
  }, [reviewData, newUser]);

  const clearAllreviewData = () => {
    setNewReviewData({
      name: "",
      review: "",
      image: "",
      email: "",
    });
    setReviewImageUrl("");
    setReviewerLocation("");
    setShowModal(false);
  };

  if (isPending) {
    return (
      <div className="loader-container">
        <div className="loader"></div>{" "}
      </div>
    );
  }
  // reviewData?.result.length > 0 &&

  return (
    <>
      <section>
        <div className="container mx-auto px-2">
          {
            <>
              <div className="mt-24 testimonials mb-28">
                <div className="lg:grid grid-cols-2 lg:gap-14 relative h-[360px]">
                  <div>
                    <div className="mb-8">
                      <motion.h1
                        className="text-4xl font-semibold capitalize leading-[55px]"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        viewport={{ once: true }}
                      >
                        <span id="business">Feedback</span> From Our{" "}
                        <span className="customFocus">Clients</span>
                      </motion.h1>
                      <motion.p
                        className="text-[#595757] mt-2"
                        initial={{ y: -10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        viewport={{ once: true }}
                      >
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that.
                      </motion.p>
                      <div className="flex gap-3 mt-14">
                        {(reviewData?.result as ReviewData[])
                          ?.slice(0, 3)
                          ?.map((review, index) => (
                            <motion.div
                              key={review._id}
                              onClick={() => handleImageClick(index)}
                              className={
                                index === activeIndex
                                  ? "active-image image"
                                  : "image"
                              }
                              initial={{ y: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                ease: "easeInOut",
                              }}
                            >
                              <img
                                src={review?.image}
                                alt=""
                                className="object-contain cursor-pointer"
                              />
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Swiper
                      ref={swiperRef}
                      slidesPerView={2}
                      spaceBetween={30}
                      modules={[Pagination]}
                      pagination={{
                        clickable: true,
                      }}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        1024: {
                          slidesPerView: 1,
                        },
                      }}
                      className="testimonial-swiper"
                      onSlideChange={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                      }
                    >
                      {(reviewData?.result as ReviewData[])
                        ?.slice(0, 3)
                        ?.map((review) => (
                          <SwiperSlide
                            className="border rounded-lg p-5 relative"
                            key={review?.name}
                          >
                            <div>
                              <p className="text-md">
                                <i>{review.review}</i>
                              </p>
                              <h4 className="capitalize font-medium mt-5">
                                {review?.name}
                              </h4>
                              <span className="text-[#999]">
                                {review?.location}
                              </span>
                              <img src={quote} alt="" className="absolute" />
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </>
          }
        </div>

        {!checkUserReview && (
          <button
            className="hidden md:flex gap-[4px] border border-[#39c1fc] text-black text-sm px-6 py-2 items-center rounded-md font-normal fixed top-1/2 -translate-y-1/2 right-[-78px] bg-[#39c1fc] text-white text-sm custom-background"
            style={{
              transform: "rotate(90deg)",
            }}
            onClick={() => setShowModal(true)}
          >
            {" "}
            Give us a review now
          </button>
        )}
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          testimonialModal={testimonialModal}
          newReviewData={newReviewData}
          setReviewImageUrl={setReviewImageUrl}
          reviewError={reviewError}
          setReviewError={setReviewError}
          handleNewReviewSubmit={handleNewReviewSubmit}
          handleReviewChange={handleReviewChange}
          setReviewerLocation={setReviewerLocation}
          clearAllreviewData={clearAllreviewData}
        />
        <Toaster
          toastOptions={{
            className: "",
            style: {
              padding: "8px 26px",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "8px",
              background: "linear-gradient(to right, #28bdfd, #05547f)",
            },
          }}
        />
      </section>
    </>
  );
};

export default Reviews;
