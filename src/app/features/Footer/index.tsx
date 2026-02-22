"use client";

import { FC, ReactElement } from "react";
import { NextJSLogo, VercelWordmark } from "@/app/components/Icons";

const Footer: FC = (): ReactElement => {
  return (
    <div id="footer" className="fixed bottom-0 left-0 right-0 bg-black p-4 text-center gap-2 z-20 flex flex-col">
      <p className="text-slate-400">&copy; Ankit Bhatia</p>
      <p className="text-white flex justify-center items-center gap-5">
        <NextJSLogo height={14} className="ml-1 fill-white" />
        <VercelWordmark height={14} className="ml-1 fill-white" />
      </p>
    </div>
  );
};

export default Footer;
