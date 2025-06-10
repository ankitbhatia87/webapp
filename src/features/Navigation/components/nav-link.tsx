import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  label: string;
  redirect: string;
}

const NavLinkComp: FC<Props> = ({ name, label, redirect }): ReactElement => (
  <div id={name} className="flex">
    <Link to={redirect} className="py-4">
      {label}
    </Link>
  </div>
);

export default NavLinkComp;
