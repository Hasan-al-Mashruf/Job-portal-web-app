import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

import { CategoryData, JobPostType } from "../../types/types.portal";
import CategoryLoader from "../Loader/CategoryLoader";
import { motion } from "framer-motion";

const TrendingJobs = () => {
  const [isFetching, categorydata] = useFetchData("categoryList");
  const [isLoading, jobPostList] = useFetchData("jobList");

  const getCategoryCount = (cat: string) => {
    if (jobPostList.length) {
      const getCountNumber = (jobPostList as JobPostType[])?.filter(
        (job) => job.category.toLowerCase() === cat.toLowerCase()
      );
      return getCountNumber.length;
    }
  };

  return (
    <div className="mt-24">
      <div className="flex justify-between mb-12 flex-wrap gap-6">
        <div>
          <motion.h1
            className="text-xl font-semibold"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            Trending Jobs{" "}
            <span className="customFocus font-bold">Category</span>
          </motion.h1>
          <motion.p
            className="text-sm text-[#999] font-normal mt-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            To choose your trending job dream & to make future bright.
          </motion.p>
        </div>
        <div>
          <button
            className="gb gb-bordered hover-slide hover-fill m-0"
            id="gb10"
          >
            Explore More
          </button>
        </div>
      </div>
      {(isLoading || isFetching) && <CategoryLoader />}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  gap-3">
        {(categorydata as CategoryData[])?.map((category, index) => {
          const availbleJobs = getCategoryCount(category?.category);

          return (
            <div key={index}>
              <motion.div
                className="card border border-[#b8b6b6] rounded-lg p-3 relative h-[126px] flex flex-col justify-between"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between">
                  <img src={category?.image} alt="" className="w-10" />

                  <div className="flex gap-2 items-center">
                    <p className="text-xs relative opacity-40 md:block hidden">
                      Job Available
                    </p>
                    <div className="w-8 h-8 bg-[#38bff8] rounded-md flex items-center justify-center">
                      <span
                        className="text-white italic"
                        style={{ textShadow: "0px 1px 0px black" }}
                      >
                        {availbleJobs?.toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="md:text-sm text-xs capitalize font-semibold mt-3 -mb-1">
                    {category?.category}
                  </h3>
                  <Link
                    to={`/joblist/${category.category}`}
                    className="text-xs"
                  >
                    See Details
                  </Link>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingJobs;
