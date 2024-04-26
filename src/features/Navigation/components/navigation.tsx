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
      {navData.map((nav) => (
        <NavLinkComp
          name={nav.name}
          label={nav.label}
          redirect={nav.redirect}
          key={nav.name}
        />
      ))}
    </div>
  );
};

export default NavigationComp;
