"use client";

import { FC, ReactElement } from "react";
import { NextJSLogo, VercelWordmark } from "@/app/components/Icons";

const Footer: FC = (): ReactElement => {
  return (
    <div id="footer" className="bg-black p-6 text-center z-20">
      <p className="text-slate-400">&copy; Ankit Bhatia</p>
      <p className="text-white flex justify-center items-center">
        <span className="ml-2 text-slate-400">Powered by:</span>
        <NextJSLogo height={14} className="ml-1 fill-white" />
        <span className="ml-4 text-slate-400">Deployed on:</span>
        <VercelWordmark height={14} className="ml-1 fill-white" />
      </p>
    </div>
  );
};

export default Footer;
