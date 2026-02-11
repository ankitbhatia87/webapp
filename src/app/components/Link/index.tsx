import Link from "next/link";
import { ABWLinkProps } from "./interface";

const ABWLink = ({ href, target, children, to, title }: ABWLinkProps) => {
  if (to === "" || !to) {
    return (
      <a href={href} target={target} title={title}>
        {children}
      </a>
    );
  } else {
    return <Link href={to}>{children}</Link>;
  }
};

export default ABWLink;
