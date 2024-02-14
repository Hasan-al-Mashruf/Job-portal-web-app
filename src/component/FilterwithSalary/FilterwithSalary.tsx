import { useEffect, useState } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import { JobPostType } from "../../types/types.portal";
import { getMaxMinValue } from "../api/Api";
import useFetchData from "../../hooks/useFetchData";
import { motion } from "framer-motion";
export type SliderChangeEvent = {
  minValue: number;
  maxValue: number;
};

type FilterwithSalary = {
  setFilteredJobList: (argument: JobPostType[]) => void;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  setShowMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
};
const FilterwithSalary: React.FC<FilterwithSalary> = ({
  setFilteredJobList,
  setItemOffset,
  setShowMobileFilter,
}) => {
  const [isPending, jobPostList] = useFetchData("jobList");
  const [rangeMinValue, setRangeMinValue] = useState(30);
  const [rangeMaxValue, setRangeMaxValue] = useState(90);
  const salaryTag = ["30k-50k", "50k-70k", "70k-90k", "90k-120k", "120k-150k"];

  const [checkItem, setCheckItem] = useState<string>("");

  const handleInput = (e: SliderChangeEvent) => {
    setRangeMinValue(e.minValue);
    setRangeMaxValue(e.maxValue);
  };

  const handleCheckItem = (category: string) => {
    setCheckItem(category);
  };

  // range max min value

  useEffect(() => {
    setCheckItem("");
    setItemOffset(0);
    const filteredPosts = (jobPostList as JobPostType[])?.filter((job) => {
      const splitJobSalary = job.salary?.split("-");
      const [jobMinValue, jobMaxValue] = getMaxMinValue(
        splitJobSalary as string[]
      );

      return jobMinValue >= rangeMinValue && jobMaxValue <= rangeMaxValue;
    });
    setFilteredJobList(filteredPosts);
  }, [
    rangeMinValue,
    rangeMaxValue,
    jobPostList,
    setFilteredJobList,
    setItemOffset,
  ]);

  //checkbox max min value

  useEffect(() => {
    setItemOffset(0);
    const splitCheckItem = checkItem?.split("-");
    const [minValue, maxValue] = getMaxMinValue(splitCheckItem);

    const filteredPosts = (jobPostList as JobPostType[])?.filter((job) => {
      const splitJobSalary = job.salary?.split("-");
      const [jobMinValue, jobMaxValue] = getMaxMinValue(
        splitJobSalary as string[]
      );
      return jobMinValue >= minValue && jobMaxValue <= maxValue;
    });
    setFilteredJobList(filteredPosts);
    setShowMobileFilter(false);
  }, [
    checkItem,
    jobPostList,
    setFilteredJobList,
    setItemOffset,
    setShowMobileFilter,
  ]);

  if (isPending) {
    return "";
  }
  return (
    <div className="flex gap-4 my-1 mb-2 fle flex-nowrap flex-wrap flex-col">
      <RangeSlider
        rangeMinValue={rangeMinValue}
        rangeMaxValue={rangeMaxValue}
        handleInput={handleInput}
      />
      {salaryTag?.map((category, index) => {
        return (
          <>
            <motion.div
              className="flex justify-between"
              key={category}
              initial={{ opacity: 0, y: 60, x: -60 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
            >
              <div key={index} className="flex items-center gap-3 relative">
                <input
                  type="radio"
                  id={category}
                  value={category}
                  checked={category == checkItem}
                  onChange={() => handleCheckItem(category)}
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
            </motion.div>
          </>
        );
      })}
    </div>
  );
};

export default FilterwithSalary;
