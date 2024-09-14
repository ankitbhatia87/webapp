import { FC, ReactElement } from "react";
import { motion } from "framer-motion";
import DynamicTextComp from "./components/DynamicText";
import ABWButton from "../../ui.kit/Button";
import GreetingText from "./components/GreetingText";
import { ButtonType } from "../../ui.kit/Button/enum";
import Ankit from "../../assets/ankit.png";
import Image from "../../ui.kit/Image";
import ABWLink from "../../ui.kit/Link";
import useMatchMedia from "../../utils/match-media";

const Banner: FC = (): ReactElement => {
  const isMedium = useMatchMedia("(min-width: 768px)");

  const variants = isMedium
    ? {
        initial: {
          x: 100,
          opacity: 0
        }
      }
    : {
        initial: {
          x: 0,
          opacity: 0
        }
      };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="banner"
      className="min-h-[30rem] pt-16 relative grid grid-flow-row"
    >
      <div className="absolute inset-0 z-0 h-full w-full bg-black bg-[radial-gradient(#1b1d1d_3px,transparent_1px)] [background-size:6px_6px]"></div>
      <div className="grid justify-self-center max-w-screen-2xl w-full z-10 pt-8 xl:max-w-screen-xl lg:px-14">
        <div className="flex flex-col items-end lg:flex-row lg:justify-center">
          <motion.div
            initial={{ y: -100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-5/12 w-full flex flex-col items-center lg:items-start lg:pb-28 lg:pt-40"
          >
            <GreetingText />
            <DynamicTextComp className="w-full text-center lg:flex lg:gap-2 font-euclidCircularBLight" />
            <ABWLink
              to=""
              href="https://www.linkedin.com/in/bhatia87"
              target="_blank"
              title="See the code here"
            >
              <ABWButton type={ButtonType.Primary} className="">
                Say Hello!
              </ABWButton>
            </ABWLink>
          </motion.div>
          <motion.div
            initial={variants.initial}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12 items-center flex justify-center relative mt-6"
          >
            {/* <div className="bg-zinc-800 rounded-full w-48 h-48 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] absolute top-10 md:top-14 lg:top-20 z-10 -translate-x-1/2 left-1/2"></div> */}
            <Image src={Ankit} className="w-[70%] lg:w-[100%] z-20" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
