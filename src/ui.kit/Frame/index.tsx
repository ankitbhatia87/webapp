import Image from "../Image";
import { FrameProps } from "./interface";

const Frame = (props: FrameProps) => {
  const { imageData, className } = props;
  const { src, alt } = imageData ?? {};
  return (
    <div>
      <Image src={src} alt={alt} className={className} />
    </div>
  );
};

export default Frame;
