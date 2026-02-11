/* eslint-disable @typescript-eslint/no-require-imports */
const teamworkAnimation = require("../assets/lotties/team-work.lottie.json");
const technologyAnimation = require("../assets/lotties/technology.lottie.json");
const resultOrientedAnimation = require("../assets/lotties/result-oriented.lottie.json");
const qualityPerformanceAnimation = require("../assets/lotties/quality-performance.lottie.json");

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
