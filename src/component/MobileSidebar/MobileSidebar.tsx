import { NavLink } from "react-router-dom";
import { logo } from "../../assets";
import { signOutUser } from "../api/Api";
import { FaRegCircleUser, FaXTwitter } from "react-icons/fa6";

import {
  FaBriefcase,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  JobPortalContext,
  JobPortalContextType,
} from "../../context/JobPortalProvider";

type MobileSideBarType = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showmobileSidebar: boolean;
};
const MobileSidebar: React.FC<MobileSideBarType> = ({
  setShowModal,
  showmobileSidebar,
}) => {
  const { newUser } = useContext(JobPortalContext) as JobPortalContextType;
  const sidebarStyle = {
    left: showmobileSidebar ? "0%" : "-100%",
    transition: "left 0.3s ease-in-out",
  };

  return (
    <div
      className="py-4 justify-between items-center mobile-sidebar"
      style={sidebarStyle}
    >
      <div className="logo text-center">
        <NavLink to="/">
          <img
            src={logo}
            alt=""
            className="w-[90px]"
            style={{ filter: "drop-shadow(0px 4px 0px black)" }}
          />
        </NavLink>
      </div>
      <div>
        <nav>
          <ul className="flex gap-2 items-center">
            <NavLink to="/" className="lg:p-4 p-2 relative">
              Home
            </NavLink>
            <NavLink
              to="/joblist"
              className="lg:p-4 p-2 relative text-[#4e4d4d]"
            >
              Find Jobs
            </NavLink>
          </ul>
        </nav>
      </div>
      <div className="flex gap-5 all-btn">
        {newUser?.email ? (
          <button onClick={signOutUser}>Sign out</button>
        ) : (
          <button
            className="flex gap-[4px] border border-[#fff] text-white text-sm px-5 py-2 items-center rounded-md font-normal customFocus text-center justify-center"
            onClick={() => setShowModal(true)}
          >
            <FaRegCircleUser className="opacity-60 text-white text-sm" />
            Sign In
          </button>
        )}

        <NavLink
          to="/post-a-job"
          className="flex gap-[4px] bg-[#39c1fc] text-white text-sm px-5 py-2 items-center rounded-md font-medium custom-background justify-center"
        >
          <FaBriefcase className="text-white text-sm" /> Post A Job
        </NavLink>
      </div>

      <div>
        <div className="social-media flex gap-2 justify-center">
          <div className="w-8 h-8 rounded-full border border-[#68cefa] flex items-center justify-center">
            <FaFacebookF className="text-[#68cefa] text-xs" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#68cefa] flex items-center justify-center">
            <FaXTwitter className="text-[#68cefa] text-xs" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#68cefa] flex items-center justify-center">
            <FaInstagram className="text-[#68cefa] text-xs" />
          </div>
          <div className="w-8 h-8 rounded-full border border-[#68cefa] flex items-center justify-center">
            <FaLinkedinIn className="text-[#68cefa] text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
