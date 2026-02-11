"use client";

import { FC, ReactElement } from "react";
import useTypingText from "@/app/utils/typing-text.util";
import { DynamicTextProps } from "./interface";

const DynamicTextComp: FC<DynamicTextProps> = (
  props: DynamicTextProps
): ReactElement => {
  const { className } = props;
  const data = [
    "Performance-First Frontend Architect  ",
    "Visual Storyteller Who Codes  ",
    "Security as a Baseline Mindset ",
    "Product-Minded Problem Solver  ",
    "Wildlife Photographer  ",
    "Portrait And Maternity Specialist  ",
    "React & Next.js Architect  ",
    "Mentoring & Leadership Maturity  ",
    "The Mind Behind PUREST  "
  ];
  const printText = useTypingText(data, 100);

  return (
    <div className={`${className}`}>
      {/* <p className="text-xl pb-2 text-white tracking-wide">a.k.a.</p> */}
      <p className="text-xl pb-4 text-orange-400 tracking-wider">{printText}</p>
    </div>
  );
};

export default DynamicTextComp;
