import { FC, ReactElement } from "react";
import useTypingText from "../../../../utils/typing-text.util";

const DynamicTextComp: FC = (): ReactElement => {
  const data = [
    "Frontend Development",
    "ReactJS",
    "Javascript",
    "HTML & CSS",
    "NodeJS",
    "MongoDb",
    "GraphQL"
  ];
  const printText = useTypingText(data, 200);

  return (
    <div className="w-full text-center pb-8">
      <p className="text-xl pb-2 text-white tracking-wide">proficient in</p>
      <p className="text-xl pb-4 text-orange-400 tracking-wider">{printText}</p>
    </div>
  );
};

export default DynamicTextComp;
