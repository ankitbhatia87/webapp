import { PropsWithChildren, ReactElement } from "react";

export interface CardProps extends PropsWithChildren {
  children: ReactElement | ReactElement[];
  className: string;
}
