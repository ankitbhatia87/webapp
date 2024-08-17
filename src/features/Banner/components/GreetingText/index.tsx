import { FC, ReactElement } from "react";

const GreetingText: FC = (): ReactElement => (
  <>
    <h2 className="text-2xl text-orange-400 pb-6 uppercase tracking-wider md:text-4xl font-euclidCircularBRegular">
      Hello I'm
    </h2>
    <h1 className="text-4xl text-white pb-6 font-medium md:text-8xl font-glorify">
      Ankit Bhatia
    </h1>
  </>
);

export default GreetingText;
