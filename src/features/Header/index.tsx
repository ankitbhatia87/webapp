import { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import ABWButton from "../../ui.kit/Button";
import { ButtonType } from "../../ui.kit/Button/enum";
import Resume from "../../assets/pdf/resume.pdf";
import { AdobeStockLogo, GitHubLogo } from "../../assets/images/icons";
import ABWLink from "../../ui.kit/Link";
import Navigation from "../Navigation";

const Header: FC = (): ReactElement => {
  const handleCVDownloadBtnClick = () => {
    window.open(Resume, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="header"
      className="flex justify-center sticky top-0 z-50 w-full bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] [background-size:6px_6px]"
    >
      <div className="w-full xl:max-w-screen-xl mx-auto">
        <div className="flex justify-center p-4 md:px-0 md:justify-between gap-4 items-center">
          <Navigation />
          <div className="flex items-center gap-5">
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
            {/* <ABWLink
              to=""
              href="https://stock.adobe.com/in/contributor/210554590/Ankit"
              target="_blank"
            >
              <FiveHundredPx width={48} height={24} />
            </ABWLink> */}
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
    </motion.div>
  );
};

export default Header;
