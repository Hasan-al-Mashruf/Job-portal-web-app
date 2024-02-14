import { MdOutlineMail } from "react-icons/md";
import { CompanyRegistartionType } from "../../types/types.portal";
import { RiLockPasswordFill } from "react-icons/ri";

const CompanyRegistration: React.FC<CompanyRegistartionType> = ({
  formData,
  handleChange,
  registerStep,
  errorData,
}) => {
  errorData;
  return (
    <div className={`${registerStep !== 1 ? "hide" : "show"} default`}>
      <div>
        <div
          className={`border flex items-center gap-4 pl-4 rounded-lg form-input relative pr-5 form-input py-[2px] ${
            errorData?.email ? "border-red-400" : "border-[#999]"
          }`}
        >
          <MdOutlineMail className="text-[#38bdf8] text-xl" />
          <input
            type="email"
            name="email"
            placeholder="Place Your Email"
            className="text-sm h-10 font-normal text-black relative w-full"
            value={formData.email}
            onChange={(e) => handleChange(e, "company registration")}
            autoComplete="off"
          />
        </div>
        {errorData?.email && (
          <span className="text-[#ff4343] text-center block mt-1">
            You have forgot to add your <strong> {errorData?.email}</strong>
          </span>
        )}
      </div>
      <div className="mt-4">
        <div
          className={`border flex items-center gap-4 pl-4 rounded-lg form-input relative pr-5 form-input py-[2px] ${
            errorData?.password ? "border-red-400" : "border-[#999]"
          }`}
        >
          <RiLockPasswordFill className="text-[#38bdf8] text-xl" />
          <input
            type="password"
            name="password"
            placeholder="Place Your Password"
            className=" text-sm h-10 font-normal text-black relative w-full"
            value={formData.password}
            onChange={(e) => handleChange(e, "company registration")}
          />
        </div>
        {errorData?.password && (
          <span className="text-[#ff4343] text-center block mt-1">
            You have forgot to add your <strong> {errorData?.password}</strong>
          </span>
        )}
      </div>
    </div>
  );
};

export default CompanyRegistration;
