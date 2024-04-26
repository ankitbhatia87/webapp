import { FC, ReactElement } from "react";
import { ButtonProps } from "../interface";

const Button: FC<ButtonProps> = (props: ButtonProps): ReactElement => {
  const { className, children, onClick } = props;
  return (
    <>
      <button
        type="button"
        className={`active:outline-none focus:outline-none ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
