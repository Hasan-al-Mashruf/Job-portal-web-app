import Jobs from "../Jobs/Jobs";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";
import "./RecentJobs.css";
import { JobPostType } from "../../types/types.portal";
import useFetchData from "../../hooks/useFetchData";

type RecentJobsType = {
  itemsPerPage: number;
  itemOffset: number;
  filterJobList: JobPostType[] | [];
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  setFilteredJobList: React.Dispatch<React.SetStateAction<[] | JobPostType[]>>;
  showMobileFilter: boolean;
  setShowMobileFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

type PageClickEvent = {
  selected: number;
};

const RecentJobs: React.FC<RecentJobsType> = ({
  itemsPerPage,
  filterJobList,
  setFilteredJobList,
  itemOffset,
  setItemOffset,
  showMobileFilter,
  setShowMobileFilter,
}) => {
  const [isPending, jobPostList] = useFetchData("jobList");

  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    setDisplayList(filterJobList?.length > 0 ? filterJobList : jobPostList);
  }, [filterJobList, jobPostList]);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = displayList?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(displayList?.length / itemsPerPage);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % displayList?.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container mx-auto px-2">
      <Jobs
        currentItems={currentItems}
        itemsPerPage={itemsPerPage}
        setFilteredJobList={setFilteredJobList}
        setItemOffset={setItemOffset}
        setShowMobileFilter={setShowMobileFilter}
        showMobileFilter={showMobileFilter}
        isPending={isPending}
      />

      {(filterJobList?.length == 0 || filterJobList?.length > 7) && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<GrNext />}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={<GrPrevious />}
          renderOnZeroPageCount={null}
          pageRangeDisplayed={2}
          className="myPagination"
          pageClassName="active"
        />
      )}
    </div>
  );
};

export default RecentJobs;
