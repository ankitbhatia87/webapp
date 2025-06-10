import { FC, ReactElement } from "react";
import { AWSLogo } from "../../assets/images/icons";

const Footer: FC = (): ReactElement => {
  return (
    <div id="footer" className="bg-black p-6 text-center">
      <p className="text-white">&copy; Ankit Bhatia</p>
      <p className="text-white flex justify-center">
        This website is deployed on
        <AWSLogo
          className="fill-custom-orange"
          parentClassName="bg-white ml-3 p-1"
          width={36}
          height={24}
        />
      </p>
    </div>
  );
};

export default Footer;
