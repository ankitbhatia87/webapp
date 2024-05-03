import { FC, ReactElement } from "react";
import DynamicTextComp from "./components/DynamicText";
import ABWButton from "../../ui.kit/Button";
import GreetingText from "./components/GreetingText";
import { ButtonType } from "../../ui.kit/Button/enum";
import Ankit from "../../assets/ankit.png";
import Image from "../../ui.kit/Image";

const Banner: FC = (): ReactElement => (
  <div id="banner" className="min-h-96 pt-16 relative grid grid-flow-row">
    <div className="absolute inset-0 z-0 h-full w-full bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] [background-size:6px_6px]"></div>
    <div className="grid justify-self-center max-w-screen-2xl w-full z-10 pt-8">
      <div className="flex flex-col items-end md:flex-row md:justify-center md:items-center">
        <div className="md:w-1/2 w-full flex flex-col items-center md:items-start md:pl-12">
          <GreetingText />
          <DynamicTextComp className="w-full text-center md:flex md:gap-2" />
          <ABWButton type={ButtonType.Primary} className="">
            Say Hello!
          </ABWButton>
        </div>
        <div className="w-full md:w-1/2 items-end flex justify-center md:self-end md:justify-end md:pr-12">
          <Image src={Ankit} className="w-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default Banner;
