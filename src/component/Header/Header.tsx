import {
  FaBriefcase,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { logo } from "../../assets";
import { FaRegCircleUser, FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { signOutUser } from "../api/Api";
import { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { Link } from "react-scroll";
import {
  JobPortalContext,
  JobPortalContextType,
} from "../../context/JobPortalProvider";
const Header = () => {
  const { newUser } = useContext(JobPortalContext) as JobPortalContextType;
  const [showModal, setShowModal] = useState(false);
  const [signinModal] = useState<boolean>(true);
  const [showmobileSidebar, setShowMobileSidebar] = useState(false);

  const handleOutsideClick = (e: React.MouseEvent<MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (
      !target.classList.contains("open-icon") &&
      !target.classList.contains("close-icon")
    ) {
      setShowMobileSidebar(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showmobileSidebar]);
  return (
    <header>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        signinModal={signinModal}
      />
      <div className="flex justify-between items-center mb-5 lg:mb-0 px-4 lg:px-0">
        <div className="w-[220px] w-[160px] h-[130px] flex items-center lg:justify-center justify-start lg:border-r border-r-[#b8b8b833] lg:border-b border-b-[#f0e7e754]">
          <div className="logo">
            <NavLink to="/">
              <img
                src={logo}
                alt=""
                className="w-[90px]"
                style={{ filter: "drop-shadow(0px 4px 0px black)" }}
              />
            </NavLink>
          </div>
        </div>
        <div>
          {showmobileSidebar ? (
            <HiX
              className="lg:hidden block pr-2 text-5xl open-icon"
              onClick={() => setShowMobileSidebar(!showmobileSidebar)}
            />
          ) : (
            <HiBars3BottomRight
              className="lg:hidden block pr-2 text-5xl close-icon"
              onClick={() => setShowMobileSidebar(!showmobileSidebar)}
            />
          )}
        </div>
        <div className="lg:flex-1 lg:flex flex-col border-b border-b-[#b8b8b833] bg-[#f2fbff9e] hidden">
          <div className="lg:flex justify-between items-center border-b border-b-[#b8b8b833] py-2 px-8 hidden">
            <div>
              <h4 className="text-[#4e4d4d]">Welcome Our Job Portal!</h4>
            </div>
            <div>
              <div className="social-media flex gap-2">
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
          <div className="py-3 px-6 lg:flex justify-between items-center hidden">
            <div>
              <nav>
                <ul className="flex gap-2">
                  <NavLink to="/" className="lg:p-4 p-2 relative">
                    Home
                  </NavLink>
                  <NavLink
                    to="/joblist"
                    className="lg:p-4 p-2 relative text-[#4e4d4d]"
                  >
                    Find Jobs
                  </NavLink>
                  <Link
                    activeClass="active"
                    to="test1"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="lg:p-4 p-2 relative text-[#4e4d4d]"
                  >
                    Companies
                  </Link>
                  <Link
                    activeClass="active"
                    to="test2"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="lg:p-4 p-2 relative text-[#4e4d4d]"
                  >
                    Featured Jobs
                  </Link>
                </ul>
              </nav>
            </div>
            <div className="flex gap-5 all-btn">
              {newUser?.email ? (
                <button onClick={signOutUser}>Sign out</button>
              ) : (
                <button
                  className="flex gap-[4px] border border-[#39c1fc] text-black text-sm px-5 py-2 items-center rounded-md font-normal customFocus"
                  onClick={() => setShowModal(true)}
                >
                  <FaRegCircleUser className="opacity-60 text-black text-sm" />{" "}
                  Sign In
                </button>
              )}

              <NavLink
                to="/post-a-job"
                className="flex gap-[4px] bg-[#39c1fc] text-white text-sm px-5 py-2 items-center rounded-md font-medium custom-background"
              >
                <FaBriefcase className="text-white text-sm" /> Post A Job
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <MobileSidebar
        setShowModal={setShowModal}
        showmobileSidebar={showmobileSidebar}
      />
    </header>
  );
};

export default Header;
