import { ReactElement } from "react";

export interface ABWLinkProps {
  href?: string;
  target?: string;
  children: ReactElement;
  to?: string;
  title?: string;
}
