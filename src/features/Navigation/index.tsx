import { FC, ReactElement } from "react";
import NavigationComp from "./components/navigation";

const Navigation: FC = (): ReactElement => {
  const navData = [
    {
      name: "gallery",
      label: "Gallery",
      redirect: "/gallery"
    }
  ];
  return <NavigationComp navData={navData} />;
};

export default Navigation;
