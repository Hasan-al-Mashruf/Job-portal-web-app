import { useParams } from "react-router-dom";
import BreadCrumb from "../component/BreadCrumb/BreadCrumb";
import useFetchData from "../hooks/useFetchData";
import { TbNorthStar } from "react-icons/tb";
import { FaLocationArrow } from "react-icons/fa";
import Recruters from "../component/Recruters/Recruters";
import { placeholderimg } from "../assets";

const JobDescription = () => {
  const { id } = useParams();

  const [isPending, jobData] = useFetchData("jobDetails", "id", id);

  const [isLoading, companyData] = useFetchData(
    "companyList",
    "id",
    jobData?.result?.companyId
  );

  if (isPending || isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>{" "}
      </div>
    );
  }
  const { companyDetails, location, image, email, companyName } =
    companyData.result;
  const {
    category,
    salary,
    deadline,
    jobType,
    vacancy,
    level,
    name,
    description,
  } = jobData.result;

  return (
    <div>
      <BreadCrumb />
      <div className="container mx-auto mt-10 px-2">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 md:gap-6 gap-10">
          <div
            className="lg:col-span-2 shadow-lg p-6"
            style={{ height: "fit-content" }}
          >
            <div className="flex items-center gap-4">
              <img
                src={image ? image : placeholderimg}
                alt=""
                className="w-[80px] object-cover border rounded-md"
              />
              <div>
                <h3 className="capitalize font-semibold text-xl">
                  {companyName}
                </h3>
                <p className="flex gap-2 items-center text-xs">
                  <FaLocationArrow className="text-[#38bdf8]" />
                  {location ? location : "location is not provided"}
                </p>
              </div>
            </div>
            <div>
              <div className="mt-5 bg-[#c3eeff3b] p-5">
                <ul className="flex flex-col gap-4">
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1 capitalize">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    Job Title:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {name}
                    </span>
                  </li>
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    Vacancy:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {vacancy}
                    </span>
                  </li>
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    Salary:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {salary}
                    </span>
                  </li>
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    Deadline:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {deadline}
                    </span>
                  </li>
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    Category:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {category}
                    </span>
                  </li>
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    level:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {level}
                    </span>
                  </li>
                  <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
                    <TbNorthStar className="text-[#00b3ffc2]" />
                    Job Type:
                    <span className="ml-2 font-semibold mr-2 text-[#323232]">
                      {jobType}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div>
              <label
                htmlFor=""
                className="bg-[#e4f7ff] inline-block p-2 mb-2"
                style={{ transform: "skew(-7deg, 0deg)" }}
              >
                Company Details
              </label>
              <h3>{companyDetails}</h3>
            </div>
            <div className="mt-5">
              <label
                htmlFor=""
                className="bg-[#e4f7ff] inline-block p-2 mb-2"
                style={{ transform: "skew(-7deg, 0deg)" }}
              >
                Job Description
              </label>
              <h3>{description}</h3>
            </div>
            <div className="mt-5 border p-8 flex flex-col items-center justify-center">
              <div>
                <h4 className="text-xl font-medium">Email Now</h4>
                <p className="text-sm">
                  Send your resume at{" "}
                  <b className="underline text-[#000] font-bold">
                    <i>
                      <a href={`mailto:${email}`}>{email}</a>
                    </i>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <Recruters />
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
