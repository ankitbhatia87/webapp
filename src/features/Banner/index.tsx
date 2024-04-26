import { FC, ReactElement } from "react";
import DynamicTextComp from "./components/DynamicText";
import ABWButton from "../../ui.kit/Button";
import { ButtonType } from "../../ui.kit/Button/enum";
import GreetingText from "./components/GreetingText";

const Banner: FC = (): ReactElement => (
  <div id="banner" className="min-h-96 pt-16 relative">
    <div className="absolute inset-0 z-0 h-full w-full bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] [background-size:6px_6px]"></div>
    <div className="min-h-96 flex flex-col justify-center z-10 relative">
      <div className="flex flex-col items-center">
        <GreetingText />
        <DynamicTextComp />
        <ABWButton type={ButtonType.Primary} className="">
          Say Hello!
        </ABWButton>
      </div>
      <div>
        <div>My image here in image comp</div>
        {/* this whole component needs to be inside image component */}
      </div>
    </div>
  </div>
);

export default Banner;
