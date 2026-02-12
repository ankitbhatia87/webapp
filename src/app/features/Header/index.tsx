"use client";

import { FC, ReactElement } from "react";
import ABWButton from "@/app/components/Button";
import { ButtonType } from "@/app/components/Button/enum";
import { AdobeStockLogo, GitHubLogo, LinkedInLogo } from "@/app/components/Icons";
import ABWLink from "@/app/components/Link";

const Header: FC = (): ReactElement => {
  const handleCVDownloadBtnClick = () => {
    window.open("/pdf/resume.pdf", "_blank");
  };

  return (
    <div
      id="header"
      className="relative z-10 max-w-screen-2xl justify-self-center w-full xl:max-w-screen-xl"
    >
      <div className="absolute w-full">
        <div className="flex justify-center p-4 md:justify-end gap-4 items-center">
          <ABWLink
            to=""
            href="https://github.com/ankitbhatia87/webapp"
            target="_blank"
          >
            <GitHubLogo />
          </ABWLink>
          <ABWLink
            to=""
            href="https://stock.adobe.com/in/contributor/210554590/Ankit"
            target="_blank"
          >
            <AdobeStockLogo width={30} height={30} />
          </ABWLink>
          <ABWLink
            to=""
            href="https://www.linkedin.com/in/bhatia87"
            target="_blank"
          >
            <LinkedInLogo width={26} height={26} />
          </ABWLink>
          <ABWButton
            type={ButtonType.Secondary}
            className=""
            onClick={handleCVDownloadBtnClick}
          >
            Download CV
          </ABWButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
