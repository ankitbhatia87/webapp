import { FC, ReactElement } from "react";
import NavigationComp from "./components/navigation";

const Navigation: FC = (): ReactElement => {
  const navData = [
    {
      name: "about",
      label: "About Me",
      redirect: "/about"
    }
  ];
  return <NavigationComp navData={navData} />;
};

export default Navigation;
