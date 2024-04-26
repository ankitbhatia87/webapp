import { FC, ReactElement, Suspense } from "react";
import LoadingComponent from "../common/Loader/loader";

const About: FC = (): ReactElement => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <div>this is about component</div>
    </Suspense>
  );
};

export default About;
