import Image from "../Image";
import { FrameProps } from "./interface";

const Frame = (props: FrameProps) => {
  const { imageData, className, frameClasses } = props;
  const { src, alt } = imageData ?? {};
  return (
    <div className={frameClasses}>
      <Image src={src} alt={alt} className={className} />
    </div>
  );
};

export default Frame;
