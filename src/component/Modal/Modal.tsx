//@ts-nocheck

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./Modal.css";
import { CustomFile, ModalType, OptionType } from "../../types/types.portal";
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import CompanyRegistration from "../CompanyDetails/CompanyRegistration";
import Company from "../CompanyDetails/Company";
import { SingleValue } from "react-select";
import { IoClose } from "react-icons/io5";
import { JobPortalContext } from "../../context/JobPortalProvider";
import { signinUser, signupUser } from "../api/Api";
import toast, { Toaster } from "react-hot-toast";
import ReviewForm from "../Forms/ReviewForm";
import { auth } from "../../firebase/firebase.config";
type ModalType1 = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  signinModal?: boolean;
};

const Modal: React.FC<ModalType1 | ModalType> = ({
  setShowModal,
  showModal,
  signinModal,
  testimonialModal,
  newReviewData,
  setReviewImageUrl,
  handleNewReviewSubmit,
  reviewError,
  handleReviewChange,
  setReviewerLocation,
  clearAllreviewData,
}) => {
  const { setNewUser, newUser } = useContext(JobPortalContext);
  const [companyLocation, setCompanyLocation] = useState<string>("");
  const [registerStep, setRegisterStep] = useState<number>(1);

  const [companyImg, setCompanyImg] = useState<string>("");

  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDetails: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [files, setFiles] = useState<CustomFile[]>([]);
  const [errorData, setErrorData] = useState({
    email: "",
    password: "",
    companyName: "",
    companyDetails: "",
  });

  const clearErrorData = () => {
    setErrorData({
      email: "",
      password: "",
      companyName: "",
      companyDetails: "",
    });
  };

  const clearData = () => {
    setFormData({
      email: "",
      password: "",
    });
    setCompanyData({
      companyName: "",
      companyDetails: "",
    });
  };

  const selectChange = (newValue: SingleValue<{ label: string }>) => {
    if (newValue) {
      setCompanyLocation((newValue as OptionType)?.value);
    }
  };

  const addError = (argument: string) => {
    const newError = { [argument]: argument };

    setErrorData((prev) => {
      return { ...prev, ...newError };
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (registerStep == 1) {
      if (!formData?.email) {
        addError("email");
        return false;
      }

      if (!formData?.password) {
        addError("password");
        return false;
      }
    }

    if (registerStep == 2) {
      if (!companyData?.companyName) {
        addError("companyName");
        return;
      }

      if (!companyData?.companyDetails) {
        addError("companyDetails");
        return;
      }
    }

    setRegisterStep((prevStep) => {
      return prevStep < 3 ? prevStep + 1 : 1;
    });

    clearErrorData();
  };

  const handleBack = () => {
    setRegisterStep((prevStep) => {
      return prevStep > 1 ? prevStep - 1 : 1;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    argument: string
  ) => {
    clearErrorData();

    if (argument == "company details") {
      setCompanyData({
        ...companyData,
        [e.target.name]: e.target.value,
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const responseData = await signupUser(
        formData.email,
        formData.password,
        companyData.companyName,
        companyImg,
        companyLocation,
        companyData.companyDetails
      );

      setNewUser((prev) => {
        return { ...prev, ...{ temporaryId: responseData?.insertedId } };
      });

      if (responseData.acknowledged) {
        toast.success(`${companyData.companyName}, Welcome to Job Portal`);
        clearAllData();
        setShowModal(false);
      } else {
        toast.error(
          "Email is already in use. Please use a different email or sign up."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const clearAllData = () => {
    setRegisterStep(1);
    clearErrorData();
    clearData();
    setShowModal(false);
  };

  const handleSignIn = async () => {
    if (!formData?.email) {
      addError("email");
      return false;
    }

    if (!formData?.password) {
      addError("password");
      return false;
    }
    const returnData = await signinUser(formData);

    if (returnData) {
      toast.success(`${auth?.currentUser?.displayName}, Welcome to Job Portal`);
      clearAllData();
      setShowModal(false);
    } else {
      toast.error("You are not signed up, Please sign up first");
    }
  };

  useEffect(() => {
    if (testimonialModal) {
      setReviewerLocation(companyLocation);
    }
  }, [companyLocation, setReviewerLocation, testimonialModal]);

  return (
    <div
      className={`${
        showModal &&
        "fixed top-0 left-0 right-0 bottom-0 bg-[#000000c2] modal-wrapper"
      }`}
    >
      <div
        className={`modal ${showModal ? "show" : ""}`}
        style={{ boxShadow: "0px 4px 6px 0px" }}
      >
        {!testimonialModal ? (
          <>
            <div>
              <h3 className="font-semibold text-xl mb-3 pb-3 border-b">
                Register Your Company Now
              </h3>
              <form action="">
                <CompanyRegistration
                  registerStep={registerStep}
                  formData={formData}
                  handleChange={handleChange}
                  errorData={errorData}
                />

                <CompanyDetails
                  selectChange={selectChange}
                  registerStep={registerStep}
                  errorData={errorData}
                  handleChange={handleChange}
                  companyData={companyData}
                  setCompanyImg={setCompanyImg}
                  files={files}
                  setFiles={setFiles}
                />

                <Company
                  companyImg={companyImg}
                  companyName={companyData?.companyName}
                  companyDetails={companyData?.companyDetails}
                  email={formData.email}
                  companyLocation={companyLocation}
                  registerStep={registerStep}
                />
              </form>
              <div className="flex justify-center items-center w-full gap-2 mt-4">
                {!signinModal && (
                  <div
                    onClick={handleBack}
                    className={registerStep > 1 ? "" : "opacity-60"}
                  >
                    <button
                      className="border border-[#39c1fc] flex text-black text-sm px-8 py-2 items-center rounded-md font-medium ml-auto relative z-40"
                      disabled={registerStep > 1 ? false : true}
                    >
                      Back
                    </button>
                  </div>
                )}
                {signinModal ? (
                  <button
                    className="flex gap-[4px] bg-[#39c1fc] text-white text-sm px-8 py-2 items-center rounded-md font-medium ml-auto relative z-40"
                    onClick={handleSignIn}
                  >
                    sign in
                  </button>
                ) : (
                  <div onClick={registerStep > 2 ? handleSubmit : handleNext}>
                    <button className="flex gap-[4px] bg-[#39c1fc] text-white text-sm px-8 py-2 items-center rounded-md font-medium ml-auto relative z-40">
                      {registerStep > 2 ? "Submit" : "Next"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {signinModal ? (
              <div
                className="absolute w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#39c1fc] top-2 right-2 cursor-pointer"
                onClick={clearAllData}
              >
                <IoClose className="text-[#39c1fc] text-xl" />
              </div>
            ) : (
              <div
                className="absolute w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#39c1fc] top-2 right-2 cursor-pointer"
                onClick={clearAllData}
              >
                <IoClose className="text-[#39c1fc] text-xl" />
              </div>
            )}
          </>
        ) : (
          <ReviewForm
            newReviewData={newReviewData}
            reviewError={reviewError}
            handleReviewChange={handleReviewChange}
            files={files}
            setFiles={setFiles}
            setReviewImageUrl={setReviewImageUrl}
            handleNewReviewSubmit={handleNewReviewSubmit}
            setShowModal={setShowModal}
            selectChange={selectChange}
            clearAllreviewData={clearAllreviewData}
          />
        )}
      </div>
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

export default Modal;
