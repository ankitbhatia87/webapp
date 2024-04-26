import { FC, ReactElement } from "react";
// import Navigation from "../Navigation";
import ABWButton from "../../ui.kit/Button";
import { ButtonType } from "../../ui.kit/Button/enum";
import Resume from "../../assets/pdf/resume.pdf";

const Header: FC = (): ReactElement => {
  const handleCVDownloadBtnClick = () => {
    window.open(Resume, "_blank");
  };

  return (
    <div id="header" className="relative z-10">
      <div className="absolute w-full">
        <div className="flex justify-center p-4">
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
