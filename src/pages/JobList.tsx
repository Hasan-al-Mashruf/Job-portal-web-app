import { useEffect, useState } from "react";
import BreadCrumb from "../component/BreadCrumb/BreadCrumb";
import RecentJobs from "../component/RecentJobs/RecentJobs";
import useFetchData from "../hooks/useFetchData";

import { getCategoryCount } from "../component/api/Api";
import FilterwithSalary from "../component/FilterwithSalary/FilterwithSalary";
import { CategoryData, JobPostType } from "../types/types.portal";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Recruters from "../component/Recruters/Recruters";
import { motion } from "framer-motion";
const JobList = () => {
  const { cat } = useParams();
  const [isPending, jobPostList] = useFetchData("jobList");
  const [filterJobList, setFilteredJobList] = useState<JobPostType[] | []>([]);
  const [isLoading, categoryData] = useFetchData("categoryList");
  const [checkItem, setCheckItem] = useState<string>("");
  const [itemOffset, setItemOffset] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    if (cat) {
      setCheckItem(cat);
    }
  }, [cat]);

  useEffect(() => {
    if (checkItem) {
      const newFilteredJobList = (jobPostList as JobPostType[])?.filter(
        (job) => {
          return job?.category?.toLowerCase() == checkItem?.toLowerCase();
        }
      );
      setItemOffset(0);
      setFilteredJobList(newFilteredJobList);
      setShowMobileFilter(false);
    }
  }, [checkItem, jobPostList]);

  if (isPending) {
    return "";
  }

  const mobileSortingStyle = {
    right: showMobileFilter ? "0%" : "-100%",
    transition: "right 0.2s ease-in-out",
  };
  return (
    <div>
      <BreadCrumb />
      <div className="container mx-auto">
        <div className="grid md:grid-cols-6 grid-cols-1 gap-5 relative">
          <div
            className="md:col-span-2 bg-[#f2ffff] p-4 flex flex-col gap-10 mobile-sorting-option md:overflow-hidden"
            style={mobileSortingStyle}
          >
            <div>
              <div className="jobCategory shadow-lg bg-white p-4">
                <div className="flex gap-4 my-1 mb-2 fle flex-nowrap flex-wrap flex-col">
                  {isLoading && <Skeleton count={7} />}
                  {(categoryData as CategoryData[])?.map((cat, index) => {
                    const { category } = cat;
                    const availbleJobs = getCategoryCount(
                      cat?.category,
                      jobPostList
                    );

                    return (
                      <>
                        <motion.div
                          className="flex justify-between myDiv"
                          key={index}
                          initial={{ opacity: 0, y: 60, x: -60 }}
                          whileInView={{ opacity: 1, y: 0, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="flex items-center gap-3 relative">
                            <input
                              type="radio"
                              id={category}
                              value={category}
                              checked={category == checkItem}
                              onChange={() => setCheckItem(category)}
                            />
                            <label
                              htmlFor={category}
                              className="text-[#000000e3] text-sm capitalize font-medium"
                            >
                              {category}
                            </label>
                            <label
                              htmlFor={category}
                              className="check absolute left-0 w-4 h-4 rounded-full border border-[#38bdf8] bg-white"
                            ></label>
                          </div>
                          <div>({availbleJobs})</div>
                        </motion.div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="jobCategory shadow-lg bg-white p-4">
              <FilterwithSalary
                setFilteredJobList={setFilteredJobList}
                setItemOffset={setItemOffset}
                setShowMobileFilter={setShowMobileFilter}
              />
            </div>
            <>
              <Recruters sliderparamiter={2} />
            </>
          </div>
          <div className="md:col-span-4">
            <RecentJobs
              itemsPerPage={7}
              filterJobList={filterJobList}
              itemOffset={itemOffset}
              setItemOffset={setItemOffset}
              setFilteredJobList={setFilteredJobList}
              setShowMobileFilter={setShowMobileFilter}
              showMobileFilter={showMobileFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
