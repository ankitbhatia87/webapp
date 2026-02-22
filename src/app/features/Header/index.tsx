"use client";

import { FC, ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ABWButton from "@/app/components/Button";
import { ButtonType } from "@/app/components/Button/enum";
import { AdobeStockLogo, GitHubLogo, InstagramLogo, LinkedInLogo } from "@/app/components/Icons";
import ABWLink from "@/app/components/Link";

const Header: FC = (): ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isGallery = pathname === "/photography";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCVDownloadBtnClick = () => {
    window.open("/pdf/resume.pdf", "_blank");
  };

  return (
    <div
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] bg-size-[6px_6px] backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "py-2 shadow-md" : "py-4"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto xl:max-w-screen-xl">
        <div className="flex justify-between px-4 gap-4 items-center min-h-13">
          {/* Navigation Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className={`font-poppinsMedium transition-all duration-300 ${
                pathname === "/" 
                  ? "text-orange-400 scale-110" 
                  : "text-white hover:text-orange-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/photography"
              className={`font-poppinsMedium transition-all duration-300 ${
                pathname === "/photography" 
                  ? "text-orange-400 scale-110" 
                  : "text-white hover:text-orange-300"
              }`}
            >
              Photography
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Social Icons & Download Button - Always Visible */}
          <div className="flex gap-2 md:gap-4 items-center ml-auto">
            {isGallery ? (
              <>
                <ABWLink
                  to=""
                  href="https://www.instagram.com/ankitbhatiaphotography"
                  target="_blank"
                >
                  <InstagramLogo
                    width={isScrolled ? 20 : 26}
                    height={isScrolled ? 20 : 26}
                    className="transition-all duration-300 text-white hover:text-pink-500"
                  />
                </ABWLink>
                <ABWLink
                  to=""
                  href="https://www.instagram.com/storiesbyankitbhatia"
                  target="_blank"
                >
                  <InstagramLogo
                    width={isScrolled ? 20 : 26}
                    height={isScrolled ? 20 : 26}
                    className="transition-all duration-300 text-white hover:text-orange-500"
                  />
                </ABWLink>
                <ABWLink
                  to=""
                  href="https://stock.adobe.com/in/contributor/210554590/Ankit"
                  target="_blank"
                >
                  <AdobeStockLogo
                    width={isScrolled ? 24 : 30}
                    height={isScrolled ? 24 : 30}
                    className="transition-all duration-300 text-white hover:text-red-500"
                  />
                </ABWLink>
              </>
            ) : (
              <>
                <ABWLink
                  to=""
                  href="https://github.com/ankitbhatia87/webapp"
                  target="_blank"
                >
                  <GitHubLogo className={`transition-all duration-300 text-white hover:text-gray-400 ${isScrolled ? "w-5 h-5" : "w-6 h-6"}`} />
                </ABWLink>
                <ABWLink
                  to=""
                  href="https://www.linkedin.com/in/bhatia87"
                  target="_blank"
                >
                  <LinkedInLogo
                    width={isScrolled ? 20 : 26}
                    height={isScrolled ? 20 : 26}
                    className="transition-all duration-300 text-white hover:text-sky-600"
                  />
                </ABWLink>
                <ABWButton
                  type={ButtonType.Secondary}
                  className={`transition-all duration-300 ${isScrolled ? "text-sm px-3 py-1.5" : ""}`}
                  onClick={handleCVDownloadBtnClick}
                >
                  Download CV
                </ABWButton>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-80 mt-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4 pb-4 border-t border-gray-700 pt-4 pl-3">
            <Link
              href="/"
              className={`font-poppinsMedium transition-colors ${
                pathname === "/" ? "text-orange-400" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/photography"
              className={`font-poppinsMedium transition-colors ${
                pathname === "/photography" ? "text-orange-400" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Photography
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
