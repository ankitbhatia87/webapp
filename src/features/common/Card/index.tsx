import { FC, ReactElement } from "react";
import { CardProps } from "./interface";

const Card: FC<CardProps> = (props): ReactElement => {
  const { children, className } = props;
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border-solid border border-slate-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
