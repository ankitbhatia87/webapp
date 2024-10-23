import { FC, ReactElement } from "react";
import NavLinkComp from "./nav-link";

interface Props {
  navData: {
    name: string;
    label: string;
    redirect: string;
  }[];
}

const NavigationComp: FC<Props> = ({ navData = [] }): ReactElement => {
  return (
    <div id="navigation">
      <div>
        <div
          className="fixed md:relative bottom-0 left-0 w-full md:w-full bg-black md:bg-transparent z-[60] p-2 md:p-0
          h-20 md:h-auto md:rounded-none shadow-up-2xl md:shadow-none md:mr-10 flex items-center"
        >
          {navData.map((nav) => (
            <NavLinkComp
              name={nav.name}
              label={nav.label}
              redirect={nav.redirect}
              key={nav.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationComp;
