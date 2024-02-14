import { useEffect, useState } from "react";
import { bannerimg1, bannerimg2, bannerimg3, bannerimg4 } from "../../assets";
import "./Banner.css";
import { BsSearch } from "react-icons/bs";
import { JobPostType } from "../../types/types.portal";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
const Banner = () => {
  const [isPending, jobPostList] = useFetchData("jobList");
  const [activeImage, setActiveImage] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobPostType[] | []>([]);
  const handleImageHover = (index: number) => {
    setActiveImage(index);
  };

  useEffect(() => {
    if (searchKeyword == "") {
      setFilteredJobs([]);
      return;
    }

    setFilteredJobs(
      (jobPostList as JobPostType[])?.filter(
        (job) =>
          job.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          job.category.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, jobPostList]);

  if (isPending) {
    return;
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="banner">
      <div className="container mx-auto px-2">
        <div className="lg:grid grid-cols-5 gap-10 items-center">
          <motion.div className="lg:col-span-3 md:col-span-1 lg:pr-10 lg:pb-0 pb-6">
            <div className="mb-8">
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="md:text-5xl text-4xl font-semibold capitalize md:leading-[55px] mb-2"
              >
                Find Your <span id="business">Dream</span> Job based on your{" "}
                <span className="customFocus">skills</span>
              </motion.h1>
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-[#595757]"
              >
                Jobs are available on your skills, perfect jobs to make bright
                future & get your choose jobs become a strong.
              </motion.p>
            </div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="border flex items-center gap-0 rounded-lg form-input relative h-10 rounded-md w-full p-8 relative"
              style={{
                background: "linear-gradient(to right, #28bdfd, #05547f)",
              }}
            >
              <div
                className="w-10 flex items-center justify-center h-10  block absolute left-6 top-1/2 -translate-y-1/2 z-20"
                style={{
                  borderRadius: "8px 50% 50% 8px",
                  background: "#ff7300",
                }}
              >
                <BsSearch className="text-white" />
              </div>{" "}
              <input
                type="text"
                placeholder="Search The job name or Category?"
                className=" text-sm h-10 font-normal text-black relative w-full rounded-md pl-10 form-input"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              {searchKeyword.length > 0 && (
                <IoMdClose
                  className="absolute right-10 cursor-pointer"
                  onClick={() => setSearchKeyword("")}
                />
              )}
              {filteredJobs?.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  viewport={{ once: true }}
                  whileInView={{ height: 200, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`absolute top-[70px] bg-white shadow-lg w-full border w-full z-40 right-[2px] bg-[#fff] ${
                    filteredJobs?.length > 3
                      ? "h-[200px] overflow-y-scroll"
                      : ""
                  }`}
                >
                  {filteredJobs?.map((job) => {
                    return (
                      <>
                        <Link to={`/jobDetails/${job._id}`}>
                          <div className="px-4 py-3 border-b border-b-[#e1e1e1] hover:bg-[#daeeff] flex justify-between">
                            <h2 className=" capitalize font-medium">
                              {job?.name}
                            </h2>
                            <span className="customFocus font-bold">
                              Vacancy:{" "}
                              <i>{job?.vacancy?.toString().padStart(2, "0")}</i>
                            </span>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            className="banner-img flex col-span-2 gap-4 items-end"
            style={{ height: "380px" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 1 }}
          >
            {[bannerimg1, bannerimg2, bannerimg3, bannerimg4].map(
              (image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt=""
                  className={index === activeImage ? "active" : ""}
                  onMouseEnter={() => handleImageHover(index)}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.5,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                />
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
