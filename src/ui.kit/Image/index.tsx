import { FC, ReactElement } from "react";
import { ImageBaseProps } from "./interface";

const Image: FC<ImageBaseProps> = (props: ImageBaseProps): ReactElement => {
  const { src, alt, className } = props;
  return <img src={src} alt={alt} className={className} />;
};

export default Image;
