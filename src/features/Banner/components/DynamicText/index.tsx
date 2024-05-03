import { FC, ReactElement } from "react";
import useTypingText from "../../../../utils/typing-text.util";
import { DynamicTextProps } from "./interface";

const DynamicTextComp: FC<DynamicTextProps> = (
  props: DynamicTextProps
): ReactElement => {
  const { className } = props;
  const data = [
    "Frontend Development",
    "ReactJS",
    "Javascript",
    "HTML & CSS",
    "NodeJS",
    "MongoDb",
    "GraphQL"
  ];
  const printText = useTypingText(data, 150);

  return (
    <div className={`${className}`}>
      <p className="text-xl pb-2 text-white tracking-wide">skilled in</p>
      <p className="text-xl pb-4 text-orange-400 tracking-wider">{printText}</p>
    </div>
  );
};

export default DynamicTextComp;
