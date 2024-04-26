import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Body: FC = (): ReactElement => (
  <div id="pages" className="bg-slate-200">
    <Outlet />
  </div>
);

export default Body;
