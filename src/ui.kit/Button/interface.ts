import { MouseEventHandler, ReactNode } from "react";
import { ButtonType } from "./enum";

export interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonTypeProp extends ButtonProps {
  type: ButtonType;
}

export interface CardCommonData {
  icon: ReactNode;
  heading: string;
  text: string;
}
