import { useEffect, useState } from "react";
import { GiLevelFour } from "react-icons/gi";
import Select, { SingleValue } from "react-select";
import { filterDateData } from "../../data/data";
import { JobPostType } from "../../types/types.portal";
import useFetchData from "../../hooks/useFetchData";

const FilterwithDate: React.FC<{
  setFilteredJobList: React.Dispatch<React.SetStateAction<[] | JobPostType[]>>;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setFilteredJobList, setItemOffset }) => {
  const [isPending, jobPostList] = useFetchData("jobList");

  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    setItemOffset(0);
    const currentDate = new Date();
    const selectedFilterDate = new Date();

    const filterJobs = (startDate: Date, endDate: Date) => {
      const filteredJobs = (jobPostList as JobPostType[])?.filter((job) => {
        const postDate = new Date(job.postDate);
        postDate.setHours(0, 0, 0, 0);
        return postDate >= startDate && postDate <= endDate;
      });

      setFilteredJobList(filteredJobs);
    };

    switch (selectedFilter) {
      case "filter today":
        // Set selectedFilterDate to the beginning of the day
        selectedFilterDate.setHours(0, 0, 0, 0);
        filterJobs(selectedFilterDate, currentDate);
        break;
      case "filter past week":
        selectedFilterDate.setDate(selectedFilterDate.getDate() - 7);
        selectedFilterDate.setHours(0, 0, 0, 0);
        filterJobs(selectedFilterDate, currentDate);
        break;
      case "filter past month":
        selectedFilterDate.setMonth(selectedFilterDate.getMonth() - 1);
        selectedFilterDate.setHours(0, 0, 0, 0);
        filterJobs(selectedFilterDate, currentDate);
        break;
      default:
        break;
    }
  }, [jobPostList, selectedFilter, setFilteredJobList, setItemOffset]);

  const selectChange = (newValue: SingleValue<{ value: string }>) => {
    if (newValue) {
      setSelectedFilter(newValue.value);
    }
  };

  if (isPending) {
    return;
  }
  return (
    <div className="custom-select border flex items-center gap-4 pl-5 rounded-lg form-input relative md:max-w-[300px] ml-auto relatice z-50 w-[250px]">
      <GiLevelFour className="text-[#38bdf8]" />
      <Select
        className="react-select-container text-sm h-10 font-normal text-black relative w-full capitalize"
        onChange={selectChange}
        options={filterDateData}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default FilterwithDate;
