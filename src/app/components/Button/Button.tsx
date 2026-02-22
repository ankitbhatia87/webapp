"use client";

import { FC, ReactElement } from "react";
import { ButtonProps } from "./interface";

const Button: FC<ButtonProps> = (props: ButtonProps): ReactElement => {
  const { className, children, onClick, disabled, ...rest } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={`active:outline-none focus:outline-none ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
