"use client";

import { FC, ReactElement } from "react";
import { NextJSLogo, VercelWordmark } from "@/app/components/Icons";

const Footer: FC = (): ReactElement => {
  return (
    <div id="footer" className="fixed bottom-0 left-0 right-0 bg-black/80 p-4 text-center gap-2 z-20 flex justify-center">
      <div className="flex gap-4">
        <p className="text-slate-400">&copy; Ankit Bhatia</p>
        <p className="text-white flex justify-center items-center gap-5">
          <NextJSLogo height={14} className="ml-1 fill-white opacity-50" />
          <VercelWordmark height={14} className="ml-1 fill-white opacity-50" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
