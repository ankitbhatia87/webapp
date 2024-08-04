import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Body: FC = (): ReactElement => (
  <div id="pages">
    <Outlet />
  </div>
);

export default Body;
