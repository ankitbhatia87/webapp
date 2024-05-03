import { FC, ReactElement } from "react";

const GreetingText: FC = (): ReactElement => (
  <>
    <h2 className="text-2xl text-orange-400 pb-4 uppercase tracking-wider">
      Hello I'm
    </h2>
    <h1 className="text-4xl text-white pb-6 text-center font-medium">
      Ankit Bhatia
    </h1>
  </>
);

export default GreetingText;
