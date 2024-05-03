import { FC, ReactElement } from "react";
import { ButtonType } from "./enum";
import { ButtonTypeProp } from "./interface";
import Button from "./components/button";

const ABWButton: FC<ButtonTypeProp> = (props: ButtonTypeProp): ReactElement => {
  const { type, className, children, ...rest } = props;
  return (
    <>
      {type === ButtonType.Primary && (
        <Button
          className={`rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-none font-medium border-orange-600 text-white bg-orange-400 ${className}`}
          {...rest}
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-white top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-white transition duration-300 group-hover:text-orange-400 ease">
            {children}
          </span>
        </Button>
      )}
      {type === ButtonType.Secondary && (
        <Button
          className={`rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border border-solid font-medium border-orange-400 focus:border-orange-400 text-orange-400 bg-transparent ${className}`}
          {...rest}
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-orange-400 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative text-orange-400 transition duration-300 group-hover:text-white ease">
            {children}
          </span>
        </Button>
      )}
    </>
  );
};

export default ABWButton;
