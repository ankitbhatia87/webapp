import { PropsWithChildren, ReactElement } from "react";
import { TargetAndTransition, Transition, VariantLabels } from "framer-motion";

export interface CardProps extends PropsWithChildren {
  children: ReactElement | ReactElement[];
  className: string;
  initial?: boolean | TargetAndTransition | VariantLabels;
  whileInView?: TargetAndTransition | VariantLabels;
  transition?: Transition;
}
