import { FC, ReactElement } from "react";

const Footer: FC = (): ReactElement => {
  return (
    <div id="footer" className="bg-black p-5 text-center">
      <p className="text-white">&copy; Ankit Bhatia</p>
    </div>
  );
};

export default Footer;
