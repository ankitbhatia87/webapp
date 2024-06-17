import { FC, ReactElement } from "react";
import useTypingText from "../../../../utils/typing-text.util";
import { DynamicTextProps } from "./interface";

const DynamicTextComp: FC<DynamicTextProps> = (
  props: DynamicTextProps
): ReactElement => {
  const { className } = props;
  const data = [
    "Frontend Engineer  ",
    "Adobe Stock Contributor  ",
    "Team Leader  ",
    "15yrs Old Professional  ",
    "Table Tennis Lover  ",
    "Badminton Lover  ",
    "Writer  ",
    "Wildlife Photographer  ",
    "Portrait Photographer  "
  ];
  const printText = useTypingText(data, 100);

  return (
    <div className={`${className}`}>
      <p className="text-xl pb-2 text-white tracking-wide">a.k.a.</p>
      <p className="text-xl pb-4 text-orange-400 tracking-wider">{printText}</p>
    </div>
  );
};

export default DynamicTextComp;
