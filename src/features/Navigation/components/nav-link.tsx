import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  label: string;
  redirect: string;
}

const NavLinkComp: FC<Props> = ({ name, label, redirect }): ReactElement => (
  <div id={name} className="flex items-center">
    <Link
      to={redirect}
      className="py-4 text-slate-200 bg-neutral-700 md:bg-transparent px-5 rounded-xl"
    >
      {label}
    </Link>
  </div>
);

export default NavLinkComp;
