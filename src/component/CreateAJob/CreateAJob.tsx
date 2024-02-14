//@ts-nocheck
import Select, { SingleValue } from "react-select";
import { FaBriefcase } from "react-icons/fa";
import { useContext, useState } from "react";
import { experienceLevels, jobTypes } from "../../data/data";
import ReactDropZone from "../ReactDropZone/ReactDropZone";
import ReactDayPicker from "../DayPicker/ReactDayPicker";
import {
  Any,
  CustomFile,
  JobPostType,
  OptionType,
} from "../../types/types.portal";
import { format } from "date-fns";
import "./CreateAJob.css";
import {
  JobPortalContext,
  JobPortalContextType,
} from "../../context/JobPortalProvider";
import Modal from "../Modal/Modal";
import { saveToDb } from "../api/Api";
import { BiSolidCategory } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GiLevelFour } from "react-icons/gi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import useFetchData from "../../hooks/useFetchData";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface Option {
  value: string;
  label: string;
  type: string;
}

const CreateAJob = () => {
  const { newUser, setCount, count } = useContext(
    JobPortalContext
  ) as JobPortalContextType;
  const [isLoading, data] = useFetchData("categoryList");
  const checkboxOptions = ["fixed salary", "salary range", "negotiable"];
  const [checkItem, setCheckItem] = useState<string>("fixed salary");
  const [selectAllValue, setSelectedAllValue] = useState(Object);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobVacancy, setJobVacancy] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [imageUrl, setImageUrl] = useState<string>("");
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    if (title == "job title") {
      setJobTitle(e.target.value);
      return;
    }
    if (title == "job vacancy") {
      setJobVacancy(e.target.value);
      return;
    }
  };

  const selectChange = (newValue: SingleValue<{ label: string }>) => {
    if (newValue) {
      const { value, type } = newValue as OptionType;
      const newData = { [type]: value };
      setSelectedAllValue({ ...selectAllValue, ...newData });
    }
  };

  const handleCheckbox = (option: string): void => {
    setCheckItem(option);
  };

  const handleSalaryRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    setSalaryRange((prev) => ({ ...prev, [label]: e.target.value }));
  };

  const handleNewJob = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: JobPostType = {
      name: jobTitle,
      category: selectAllValue?.jobCategories || "",
      vacancy: jobVacancy,
      jobType: selectAllValue?.jobTypes || "",
      level: selectAllValue?.experienceLevels || "",
      deadline: format(selectedDate, "PP"),
      ...(checkItem === "salary range" && {
        salary: `${salaryRange.min}k-${salaryRange.max}k`,
      }),
      ...(checkItem === "negotiable" && { salary: "negotiable" }),
      ...(checkItem === "fixed salary" && {
        salary: `${salary}k`,
      }),
      img: imageUrl,

      companyId: newUser?.id ? newUser?.id : newUser?.temporaryId,
      description: jobDescription,
      postDate: format(new Date(), "PP"),
    };

    fetchData(newJob);
  };

  const fetchData = async (newJob: JobPostType) => {
    try {
      const response = await saveToDb(newJob, "jobList");
      if (response?.acknowledged) {
        setCount(count + 1);
        toast.success(`${newJob.name}, This job has been created`);
        resetForm();
        navigate("/joblist");
      }
    } catch (error) {
      toast.error("Error saving to database");
      console.error("Error saving to database:", error);
    }
  };

  // this fucntion will clear all the data after submit

  const resetForm = () => {
    setJobTitle("");
    setJobVacancy("");
    setSalary("");
    setSalaryRange({ min: "", max: "" });
    setSelectedDate(new Date());
    setImageUrl("");
    setJobDescription("");
    setCheckItem("fixed salary");
    setSelectedAllValue({});
    setFiles([]);
  };

  // this fucntion will check my btn disabled or not
  const isButtonDisabled = () => {
    if (
      !jobTitle ||
      !jobVacancy ||
      !selectAllValue?.jobCategories ||
      !selectedDate ||
      !imageUrl ||
      !selectAllValue?.jobTypes ||
      !selectAllValue?.experienceLevels ||
      !jobDescription
    ) {
      return true;
    }

    return false;
  };
  if (isLoading) {
    return "...";
  }

  return (
    <div className="container mx-auto create-a-job mt-10 relative">
      <div className="border border-[#38bff89c] md:py-10 md:px-20 p-4 rounded-lg">
        <h3 className="font-semibold text-xl">Job Information :</h3>
        <div>
          <form action="">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
              <div>
                <label
                  htmlFor=""
                  className="text-sm font-medium pb-1 block text-[#000000e3]"
                >
                  Job Title*
                </label>
                <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
                  <FaBriefcase className="text-[#38bdf8] text-sm" />
                  <input
                    type="text"
                    placeholder="senior ui/ux engineer"
                    className=" text-sm h-10 font-normal text-black relative w-full"
                    onChange={(e) => handleInputChange(e, "job title")}
                    value={jobTitle}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-sm font-medium pb-1 block text-[#000000e3]"
                >
                  Job Category*
                </label>
                <div className="custom-select border flex items-center gap-4 pl-5 rounded-lg form-input relative">
                  <BiSolidCategory className="text-[#38bdf8]" />
                  <Select
                    className="react-select-container text-sm h-10 font-normal text-black relative w-full"
                    onChange={selectChange}
                    options={(data as Option[])?.map((category: Any) => ({
                      value: category.category,
                      label: category.category,
                      type: "jobCategories",
                    }))}
                    classNamePrefix="react-select"
                    isSearchable={true}
                    value={
                      selectAllValue?.jobCategories
                        ? [
                            {
                              label: selectAllValue.jobCategories,
                              value: selectAllValue.jobCategories,
                            },
                          ]
                        : []
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-sm font-medium pb-1 block text-[#000000e3]"
                >
                  Vacancies*
                </label>
                <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
                  <IoPersonCircleOutline className="text-[#38bdf8]" />
                  <input
                    type="text"
                    placeholder="07 person"
                    className=" text-sm h-10 font-normal text-black relative w-full"
                    onChange={(e) => handleInputChange(e, "job vacancy")}
                    value={jobVacancy}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-sm font-medium pb-1 block text-[#000000e3]"
                >
                  Job Type*
                </label>
                <div className="custom-select  border flex items-center gap-4 pl-5 rounded-lg form-input relative">
                  <FaBriefcase className="text-[#38bdf8] text-sm" />
                  <Select
                    className="react-select-container text-sm h-10 font-normal text-black relative w-full"
                    onChange={selectChange}
                    options={jobTypes}
                    value={
                      selectAllValue?.jobTypes
                        ? [
                            {
                              label: selectAllValue.jobTypes,
                              value: selectAllValue.jobTypes,
                            },
                          ]
                        : []
                    }
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-sm font-medium pb-1 block text-[#000000e3]"
                >
                  Experience Level*
                </label>
                <div className="custom-select  border flex items-center gap-4 pl-5 rounded-lg form-input relative">
                  <GiLevelFour className="text-[#38bdf8]" />
                  <Select
                    className="react-select-container text-sm h-10 font-normal text-black relative w-full"
                    onChange={selectChange}
                    options={experienceLevels}
                    value={
                      selectAllValue?.experienceLevels
                        ? [
                            {
                              label: selectAllValue.experienceLevels,
                              value: selectAllValue.experienceLevels,
                            },
                          ]
                        : []
                    }
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
              <div>
                <ReactDayPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <div>
                <ReactDropZone
                  setImageUrl={setImageUrl}
                  files={files}
                  setFiles={setFiles}
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="text-sm font-medium pb-1 block text-[#000000e3]"
                >
                  Budget/Salary*
                </label>
                <div className="flex gap-7 items-center my-1 mb-2 fle flex-nowrap flex-wrap">
                  {checkboxOptions?.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 relative"
                      >
                        <input
                          type="radio"
                          id={option}
                          value={option}
                          checked={option == checkItem}
                          onChange={() => handleCheckbox(option)}
                        />
                        <label
                          htmlFor={option}
                          className="text-[#000000e3] text-xs capitalize"
                        >
                          {option}
                        </label>
                        <span className="check absolute left-0 w-4 h-4 rounded-full border border-[#38bdf8] bg-white"></span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  {checkItem.toLowerCase() == checkboxOptions[0] ? (
                    <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
                      <AiOutlineDollarCircle className="text-[#38bdf8]" />
                      <input
                        type="text"
                        placeholder="fix salary"
                        className=" text-sm h-10 font-normal text-black relative w-full"
                        onChange={(e) => setSalary(e.target.value)}
                        value={salary}
                      />
                    </div>
                  ) : checkItem.toLowerCase() == checkboxOptions[1] ? (
                    <div className="flex gap-8 items-center">
                      <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
                        <AiOutlineDollarCircle className="text-[#38bdf8]" />
                        <input
                          type="text"
                          placeholder="Min"
                          className=" text-sm h-10 font-normal text-black relative w-full"
                          onChange={(e) => handleSalaryRange(e, "min")}
                          value={salaryRange?.min}
                        />
                      </div>
                      <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
                        <AiOutlineDollarCircle className="text-[#38bdf8]" />
                        <input
                          type="text"
                          placeholder="Max"
                          className=" text-sm h-10 font-normal text-black relative w-full"
                          onChange={(e) => handleSalaryRange(e, "max")}
                          value={salaryRange?.max}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
                      <AiOutlineDollarCircle className="text-[#38bdf8] text-sm" />
                      <input
                        type="text"
                        placeholder="negotiable"
                        className=" text-sm h-10 font-normal text-black relative w-full"
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full pt-8">
              <textarea
                name="description"
                className="border px-5 py-2 rounded-lg form-input relative w-full h-[240px] form-textarea"
                placeholder="Write Job Description....."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>
          </form>
          <div className="text-center mt-5 flex justify-center">
            {!newUser?.email ? (
              <button
                onClick={() => setShowModal(!showModal)}
                className="flex gap-[4px] bg-[#39c1fc] text-white text-sm px-6 py-3 items-center rounded-md font-medium custom-background relative z-40"
              >
                Register your company
              </button>
            ) : (
              <button
                onClick={handleNewJob}
                className={`${
                  isButtonDisabled() && "opacity-50"
                } flex gap-[4px] bg-[#39c1fc] text-white text-sm px-6 py-3 items-center rounded-md font-medium custom-background relative z-40`}
                disabled={isButtonDisabled()}
              >
                Create A New Job
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal setShowModal={setShowModal} showModal={showModal} />
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
    </div>
  );
};

export default CreateAJob;
