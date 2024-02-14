import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoBrushOutline } from "react-icons/io5";
import useFetchData from "../../hooks/useFetchData";
import { JobPostType } from "../../types/types.portal";
const BreadCrumb = () => {
  const { id } = useParams();

  const [isPending, jobPostList] = useFetchData("jobList");

  const [currentPage, setCurrentPage] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const path: string = location?.pathname.split("/")[1];
    setCurrentPage(path);
  }, [location]);

  const filteredData = (jobPostList as JobPostType[]).find(
    (job) => job._id === id
  );

  if (isPending) {
    return;
  }
  return (
    <div className="lg:h-[180px] w-full p-9 breadcrumb bg-[#bfecff6d] flex items-center justify-center gap-2 flex-wrap">
      <Link to="/" className=" text-[#4d4d4d]">
        Home
      </Link>
      <IoBrushOutline />
      {!filteredData?.name && (
        <span className="font-semibold customFocus capitalize ">
          {currentPage}
        </span>
      )}
      {filteredData?.name && (
        <>
          <Link to="/jobList">
            <span className="capitalize text-[#4d4d4d]">{currentPage}</span>
          </Link>
          <IoBrushOutline />
          {
            <span className="font-semibold customFocus">
              {filteredData?.name}
            </span>
          }
        </>
      )}
    </div>
  );
};

export default BreadCrumb;
