import { Link } from "react-router-dom";
import { ABWLinkProps } from "./interface";

const ABWLink = ({ href, target, children, to, title }: ABWLinkProps) => {
  if (to === "") {
    return (
      <a href={href} target={target} title={title}>
        {children}
      </a>
    );
  } else {
    return <Link to={to}>{children}</Link>;
  }
};

export default ABWLink;
