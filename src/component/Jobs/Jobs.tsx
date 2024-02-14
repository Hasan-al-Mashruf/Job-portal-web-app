import { IoBookmarksOutline } from "react-icons/io5";
import { TbNorthStar } from "react-icons/tb";

import { JobPostType } from "../../types/types.portal";
import { Link } from "react-router-dom";
import FilterwithDate from "../FilterwithDate/FilterwithDate";
import FeaturedLoader from "../Loader/FeaturedLoader";
import { FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
type JobsType = {
  currentItems: JobPostType[] | [];
  itemsPerPage: number;
  setFilteredJobList: React.Dispatch<React.SetStateAction<[] | JobPostType[]>>;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  isPending: boolean;
  setShowMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileFilter: boolean;
};

const Jobs: React.FC<JobsType> = ({
  currentItems,
  itemsPerPage,
  setFilteredJobList,
  setItemOffset,
  isPending,
  setShowMobileFilter,
  showMobileFilter,
}) => {
  return (
    <div>
      <div>
        {itemsPerPage == 6 ? (
          <div
            className="flex justify-between mt-20 mb-12 flex-wrap gap-6 element"
            id="test2"
          >
            <div>
              <motion.h1
                className="text-xl font-semibold"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                Latest
                <span className="customFocus font-bold"> Featured </span>
                Jobs
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
        ) : (
          <div className="my-10">
            <div>
              <div className="flex justify-between w-fill gap-6 flex-wrap md:flex-row flex-col items-center justify-center">
                <h1 className="text-xl font-semibold">
                  Latest
                  <span className="text-[#38bff8c2] font-bold"> Featured </span>
                  Jobs
                </h1>
                <div className="flex-1 flex items-center gap-5 cursor-pointer">
                  <div
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="w-10 h-10 flex items-center justify-center rounded-sm md:hidden fixed left-0 z-50"
                    style={{
                      background: "linear-gradient(to right, #28bdfd, #05547f)",
                    }}
                  >
                    <FaFilter className="text-white" />
                  </div>

                  <FilterwithDate
                    setFilteredJobList={setFilteredJobList}
                    setItemOffset={setItemOffset}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {isPending && <FeaturedLoader />}

        {itemsPerPage == 7 && (
          <motion.div
            className="grid relative z-40 md:grid-cols-2 grid-cols-1 gap-5 recent-jobs"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {currentItems?.map((job: JobPostType) => {
              return (
                <Link to={`/jobDetails/${job._id}`} key={job._id}>
                  <div className="card border border-[#99999938] rounded-md p-3 relative ">
                    <div className="flex gap-3 items-center ">
                      <img
                        src={job?.img}
                        alt=""
                        className="w-12 h-12 rounded-full border border-gray-400 object-contain"
                      />
                      <div className="flex justify-between flex-1 items-center border-b pb-2 border-[#9999995e]">
                        <div>
                          <h2 className="text-md capitalize font-semibold text-[#363636]">
                            {job?.name}
                          </h2>

                          <h4 className="text-sm capitalize font-normal opacity-60">
                            {job?.jobType}
                          </h4>
                        </div>
                        <div className="border border-[#99999938] w-8 h-8 rounded-full flex items-center justify-center">
                          <IoBookmarksOutline className="text-[#38bff8c2] text-md" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 card-body p-5">
                      <ul className="flex flex-col gap-2">
                        <li className="text-sm font-normal text-black flex items-center gap-1">
                          <TbNorthStar className="text-[#00b3ffc2]" />
                          Salary:
                          <span className="ml-2 font-semibold mr-2 ">
                            {job?.salary} /
                          </span>
                          Per Month
                        </li>
                        <li className="text-sm font-normal text-black flex items-center gap-1">
                          <TbNorthStar className="text-[#00b3ffc2]" />
                          <span>
                            Vacancy: {job?.vacancy?.toString().padStart(2, "0")}
                          </span>
                        </li>
                        <li className="text-sm font-normal text-black flex items-center gap-1">
                          <TbNorthStar className="text-[#00b3ffc2]" />
                          <span>Deadline: {job?.deadline}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}

        {itemsPerPage == 6 && (
          <div className="grid relative z-40 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 min-h-[450px] gap-5 recent-jobs">
            {currentItems?.map((job: JobPostType, index: number) => {
              return (
                <Link to={`/jobDetails/${job._id}`} key={job._id}>
                  <motion.div
                    className="card border border-[#99999938] rounded-md p-3 relative"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="flex gap-3 items-center ">
                      <img
                        src={job?.img}
                        alt=""
                        className="w-12 h-12 rounded-full border border-gray-400 object-contain"
                      />
                      <div className="flex justify-between flex-1 items-center border-b pb-2 border-[#9999995e]">
                        <div>
                          <h2 className="text-md capitalize font-semibold text-[#363636]">
                            {job?.name}
                          </h2>

                          <h4 className="text-sm capitalize font-normal opacity-60">
                            {job?.jobType}
                          </h4>
                        </div>
                        <div className="border border-[#99999938] w-8 h-8 rounded-full flex items-center justify-center">
                          <IoBookmarksOutline className="text-[#38bff8c2] text-md" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 card-body p-5">
                      <ul className="flex flex-col gap-2">
                        <li className="text-sm font-normal text-black flex items-center gap-1">
                          <TbNorthStar className="text-[#00b3ffc2]" />
                          Salary:
                          <span className="ml-2 font-semibold mr-2 ">
                            {job?.salary} /
                          </span>
                          Per Month
                        </li>
                        <li className="text-sm font-normal text-black flex items-center gap-1">
                          <TbNorthStar className="text-[#00b3ffc2]" />
                          <span>
                            Vacancy: {job?.vacancy?.toString().padStart(2, "0")}
                          </span>
                        </li>
                        <li className="text-sm font-normal text-black flex items-center gap-1">
                          <TbNorthStar className="text-[#00b3ffc2]" />
                          <span>Deadline: {job?.deadline}</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
