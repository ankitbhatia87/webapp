import { FC, ReactElement } from "react";
// import Navigation from "../Navigation";
import ABWButton from "../../ui.kit/Button";
import { ButtonType } from "../../ui.kit/Button/enum";
import Resume from "../../assets/pdf/resume.pdf";
import { GitHubLogo } from "../../assets/images/icons";
import ABWLink from "../../ui.kit/Link";

const Header: FC = (): ReactElement => {
  const handleCVDownloadBtnClick = () => {
    window.open(Resume, "_blank");
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
          <ABWButton
            type={ButtonType.Secondary}
            className=""
            onClick={handleCVDownloadBtnClick}
          >
            Download CV
          </ABWButton>
          {/* <Navigation /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
