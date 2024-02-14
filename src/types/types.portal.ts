import React, { Dispatch, SetStateAction } from "react";
import { SingleValue } from "react-select";

export interface OptionType {
  value: string;
  label: string;
  type: string;
}
export interface ReactDayPickerProps {
  selectedDate: Date;
  setSelectedDate: (selectedDate: Date) => void;
}
export interface CustomFile extends File {
  preview: string;
}

export interface ReactDropZoneProps {
  setImageUrl: (imageUrl: SetStateAction<string>) => void;
  files: CustomFile[];
  setFiles: (files: CustomFile[]) => void;
}

export interface CompanyDetailsType {
  selectChange: (newValue: SingleValue<{ label: string }>) => void;
  registerStep: number;
  errorData: {
    email: string;
    password: string;
    companyName: string;
    companyDetails: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    argument: string
  ) => void;
  companyData: {
    companyName: string;
    companyDetails: string;
  };
  files: CustomFile[];
  setFiles: (files: CustomFile[]) => void;
  setCompanyImg: (argument: React.SetStateAction<string>) => void;
}

export interface CompanyRegistartionType {
  formData: { email: string; password: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    argument: string
  ) => void;
  registerStep: number;
  errorData: {
    email: string;
    password: string;
    companyName: string;
    companyDetails: string;
  };
}

export interface JobPostType {
  _id?: string;
  name: string;
  category: string;
  jobType: string;
  vacancy: number | string;
  deadline: string;
  salary?: string;
  img: string;
  level?: string;
  budgetType?: string;
  companyId: string | number;
  description: string;
  postDate: string;
}

export interface CompanyType {
  companyImg: string | undefined;
  companyName: string;
  companyDetails: string;
  email: string;
  companyLocation: string;
  registerStep: number;
}
export interface RecruterType {
  companyName: string;
  companyDetails: string;
  email: string;
  location: string;
  image: string;
  _id: string;
  password: string;
}
export interface NewReviewData {
  name: string;
  review: string;
  image: string;
  email: string;
}

export interface ReviewError {
  name: string;
  email: string;
  review: string;
}

export type Any = any;

export interface ModalType {
  imageUrl: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  testimonialModal: boolean;
  newReviewData: NewReviewData;
  setReviewImageUrl: (
    argument: React.SetStateAction<string | undefined>
  ) => void;
  handleNewReviewSubmit: (e: React.FormEvent) => void;
  handleReviewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setReviewerLocation: (argument: React.SetStateAction<string>) => void;
  reviewError: ReviewError;
  setReviewError: (argument: SetStateAction<ReviewError>) => void;
  signinModal: boolean;
  clearAllreviewData: () => void;
}

export interface RegisterUserProps {
  data: { email: string; password: string };
  callUser: boolean;
  name: string;
  companyImg: string | undefined;
}
export interface CategoryData {
  image: string;
  _id: string;
  category: string;
}

export interface ReviewData {
  email: string;
  image: string;
  location: string;
  name: string;
  review: string;
  _id: string;
}

export interface ReviewFormType {
  clearAllreviewData: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  selectChange: (newValue: SingleValue<{ label: string }>) => void;
  files: CustomFile[];
  setFiles: (files: CustomFile[]) => void;
  handleReviewChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleNewReviewSubmit?: (e: React.FormEvent) => void;
  setReviewImageUrl: (argument: React.SetStateAction<string>) => void;
  reviewError: ReviewError;
  newReviewData: ReviewError;
}
