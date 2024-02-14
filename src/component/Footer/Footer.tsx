import { logo } from "../../assets";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-[#0a0317] mt-[100px] px-2">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 md:py-6 pt-40 pb-4 relative items-center md:gap-2 gap-4">
          <p className="text-sm text-white">
            ©Copyright 2024 JOBES PORTAL | Develop By Moeenuddin Ahmad
          </p>

          <div className="flex md:gap-4 gap-2 lg:justify-end md:flex-row flex-col">
            <li>
              <a href="#" className="text-sm text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-white">
                Our Sitemap
              </a>
            </li>
          </div>
          <div className="logo">
            <img src={logo} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
