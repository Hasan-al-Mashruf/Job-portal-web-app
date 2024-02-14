import React from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { locations } from "../../data/data";

import { CompanyDetailsType } from "../../types/types.portal";
import { CiLocationArrow1 } from "react-icons/ci";
import Select from "react-select";
import ReactDropZone from "../ReactDropZone/ReactDropZone";

const CompanyDetails: React.FC<CompanyDetailsType> = ({
  selectChange,
  registerStep,
  errorData,
  handleChange,
  companyData,
  setFiles,
  files,
  setCompanyImg,
}) => {
  errorData;
  return (
    <div className={`${registerStep !== 2 ? "hide" : "show"} default`}>
      <div>
        <div
          className={`border flex items-center gap-4 pl-4 rounded-lg form-input relative pr-5  ${
            errorData?.companyName ? "border-red-400" : "border-[#999]"
          }`}
        >
          <HiOutlineOfficeBuilding className="text-[#38bdf8] text-xl" />
          <input
            type="text"
            name="companyName"
            placeholder="Name Of Your Company"
            className=" text-sm h-10 font-normal text-black relative w-full"
            value={companyData?.companyName}
            onChange={(e) => handleChange(e, "company details")}
            autoComplete="off"
          />
        </div>
        {errorData?.companyName && (
          <span className="text-[#ff4343] text-center block mt-1">
            You have forgot to add your{" "}
            <strong> {errorData?.companyName}</strong>
          </span>
        )}
      </div>
      <div className="custom-select border flex items-center gap-4 pl-4 rounded-lg form-input relative mt-5 border-[#999]">
        <CiLocationArrow1 className="text-[#38bdf8] text-xl" />
        <Select
          className="text-sm h-10 font-normal text-black relative w-full"
          onChange={selectChange}
          options={locations}
          classNamePrefix="react-select"
        />
      </div>

      <div className="mt-5">
        <ReactDropZone
          setImageUrl={setCompanyImg}
          files={files}
          setFiles={setFiles}
        />
      </div>
      <div className="w-full mt-5">
        <textarea
          name="companyDetails"
          className={`border px-5 py-2 rounded-lg form-input relative w-full h-[100px] form-textarea ${
            errorData?.companyDetails ? "border-red-400" : "border-[#999]"
          }`}
          placeholder="Write Company Details....."
          value={companyData?.companyDetails}
          onChange={(e) => handleChange(e, "company details")}
        ></textarea>
      </div>
      {errorData?.companyDetails && (
        <span className="text-[#ff4343] text-center block mt-1">
          You have forgot to add your{" "}
          <strong> {errorData?.companyDetails}</strong>
        </span>
      )}
    </div>
  );
};

export default CompanyDetails;
