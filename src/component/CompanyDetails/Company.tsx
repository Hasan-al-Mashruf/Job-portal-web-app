import React from "react";
import { TbNorthStar } from "react-icons/tb";
import { CompanyType } from "../../types/types.portal";
import { placeholderimg } from "../../assets";

const Company: React.FC<CompanyType> = ({
  companyImg,
  companyName,
  companyDetails,
  email,
  companyLocation,
  registerStep,
}) => {
  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className={`${registerStep <= 2 ? "hide" : "show"} default`}>
      <div className="flex flex-col gap-3">
        <div className="">
          <img
            src={companyImg ? companyImg : placeholderimg}
            alt=""
            className="rounded-lg object-contain"
          />
        </div>
        <div className="py-4 border-t border-b">
          <ul className="flex flex-col gap-3">
            <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
              <TbNorthStar className="text-[#00b3ffc2]" />
              Name:
              <b> {companyName}</b>
            </li>
            <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
              <TbNorthStar className="text-[#00b3ffc2]" />
              Location:
              {companyLocation ? companyLocation : "location is not provided"}
            </li>
            <li className="text-sm font-normal text-[#6a6a6a] flex items-center gap-1">
              <TbNorthStar className="text-[#00b3ffc2]" />
              Email:
              <i> {email}</i>
            </li>
          </ul>
        </div>
        <div>
          <li className="text-sm font-normal text-[#6a6a6a] flex flex-col items-baseline gap-1">
            <p>{truncateText(companyDetails, 20)}</p>
          </li>
        </div>
        <div>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Company;
