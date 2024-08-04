import { FC, ReactElement } from "react";
import { ScrollingTextProps } from "./interface";

const ScrollingText: FC<ScrollingTextProps> = (
  props: ScrollingTextProps
): ReactElement => {
  const { className, children } = props;
  return (
    <div className="w-full">
      <div className="block m-auto whitespace-nowrap overflow-hidden min-w-full h-full w-96">
        <span className={className}>{children}</span>
        <span className={className}>{children}</span>
      </div>
    </div>
  );
};

export default ScrollingText;
