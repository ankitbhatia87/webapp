import { ReactElement } from "react";
import { LinkProps } from "react-router-dom";

export interface ABWLinkProps extends LinkProps {
  href?: string;
  target?: string;
  children: ReactElement;
}
