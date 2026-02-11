"use client";

import { FC, ReactElement } from "react";
import { CardProps } from "./interface";
import { motion } from "framer-motion";

const Card: FC<CardProps> = (props): ReactElement => {
  const { children, className, initial, whileInView, transition } = props;
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      className={`bg-white rounded-xl shadow-lg border-solid border border-slate-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
