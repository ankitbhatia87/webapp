import teamworkAnimation from "./team-work.lottie.json";
import technologyAnimation from "./technology.lottie.json";
import resultOrientedAnimation from "./result-oriented.lottie.json";
import qualityPerformanceAnimation from "./quality-performance.lottie.json";

const defaultLottieOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export const teamworkLottieOptions = {
  ...defaultLottieOptions,
  animationData: teamworkAnimation
};

export const technologyLottieOptions = {
  ...defaultLottieOptions,
  animationData: technologyAnimation
};

export const resultOrientedLottieOptions = {
  ...defaultLottieOptions,
  animationData: resultOrientedAnimation
};

export const qualityPerformanceLottieOptions = {
  ...defaultLottieOptions,
  animationData: qualityPerformanceAnimation
};
