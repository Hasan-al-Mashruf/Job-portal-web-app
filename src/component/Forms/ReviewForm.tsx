import { MdOutlineMail } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import Select from "react-select";
import { locations } from "../../data/data";
import ReactDropZone from "../ReactDropZone/ReactDropZone";
import { IoClose } from "react-icons/io5";
import React from "react";
import { ReviewFormType } from "../../types/types.portal";

const ReviewForm: React.FC<ReviewFormType> = ({
  newReviewData,
  reviewError,
  handleReviewChange,
  files,
  setFiles,
  setReviewImageUrl,
  handleNewReviewSubmit,
  selectChange,
  clearAllreviewData,
}) => {
  return (
    <form action="">
      <h3 className="font-semibold text-xl mb-3 pb-3 border-b">
        We need your Opinion
      </h3>
      <div>
        <div
          className={`border flex items-center gap-4 pl-4 rounded-lg relative pr-5 form-input py-[2px] ${
            reviewError?.name ? "border-red-400" : "border-[#999]"
          }`}
        >
          <MdOutlineMail className="text-[#38bdf8] text-xl" />
          <input
            type="name"
            name="name"
            placeholder="Your Name.."
            className=" text-sm h-10 font-normal text-black relative w-full"
            value={newReviewData?.name}
            onChange={handleReviewChange}
            autoComplete="off"
          />
        </div>
        {reviewError?.name && (
          <span className="text-[#ff4343] text-center block mt-1 text-sm">
            You have forgot to add your <strong> {reviewError?.name}</strong>
          </span>
        )}
      </div>
      <div className="mt-5">
        <div
          className={`border flex items-center gap-4 pl-4 rounded-lg form-input relative pr-5  form-input py-[2px]  ${
            reviewError?.email ? "border-red-400" : "border-[#999]"
          }`}
        >
          <MdOutlineMail className="text-[#38bdf8] text-xl" />
          <input
            type="email"
            name="email"
            placeholder="Place Your Email"
            className=" text-sm h-10 font-normal text-black relative w-full"
            value={newReviewData?.email}
            onChange={handleReviewChange}
            autoComplete="off"
          />
        </div>
        {reviewError?.email && (
          <span className="text-[#ff4343] text-center block mt-1 text-sm">
            You have forgot to add your <strong> {reviewError?.email}</strong>
          </span>
        )}
      </div>
      <div className="custom-select border flex items-center gap-4 pl-4 rounded-lg form-input relative mt-5  border-[#999]">
        <CiLocationArrow1 className="text-[#38bdf8] text-xl" />
        <Select
          className="text-sm h-10 font-normal text-black relative w-full"
          onChange={selectChange}
          options={locations}
          classNamePrefix="react-select"
        />
      </div>
      <div className="w-full mt-5">
        <div>
          <ReactDropZone
            setImageUrl={setReviewImageUrl}
            files={files}
            setFiles={setFiles}
          />
        </div>
      </div>
      <div className="w-full mt-5">
        <textarea
          name="review"
          className={`border px-5 py-2 rounded-lg form-input relative w-full h-[100px] form-textarea  form-input py-[2px]   ${
            reviewError?.review ? "border-red-400" : "border-[#999]"
          }`}
          placeholder="Write Company Details....."
          value={newReviewData?.review}
          onChange={handleReviewChange}
        ></textarea>
        {reviewError?.review && (
          <span className="text-[#ff4343] text-center block mt-1 text-sm">
            You have forgot to add your <strong> {reviewError?.review}</strong>
          </span>
        )}
      </div>

      <div
        className="absolute w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#39c1fc] top-2 right-2 cursor-pointer"
        onClick={clearAllreviewData}
      >
        <IoClose className="text-[#39c1fc] text-xl" />
      </div>
      <button
        type="submit"
        className="flex gap-[4px] bg-[#39c1fc] text-white text-sm px-8 py-2 items-center rounded-md font-medium ml-auto mt-5 relative z-40"
        onClick={handleNewReviewSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
