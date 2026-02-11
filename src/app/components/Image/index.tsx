import { FC, ReactElement } from "react";
import NextImage from "next/image";
import { ImageBaseProps } from "./interface";

const Image: FC<ImageBaseProps> = (props: ImageBaseProps): ReactElement => {
  const { src, alt = "", className } = props;
  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      width={500}
      height={500}
      style={{ width: "auto", height: "auto" }}
    />
  );
};

export default Image;
