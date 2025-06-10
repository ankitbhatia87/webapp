import { useEffect, useState } from "react";
import Frame from "../../ui.kit/Frame";
import { getColumnsData } from "../../utils";
import { GalleryListProps } from "./interface";
import { ImageBaseProps } from "../../ui.kit/Image/interface";

const GalleryList = (props: GalleryListProps) => {
  const { data } = props;

  const [columnsData, setColumnsData] = useState<ImageBaseProps[][]>([]);

  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const refactoredColumnsData = getColumnsData(data, window.innerWidth);
        setColumnsData(refactoredColumnsData);
      }, 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return (
    <>
      {columnsData.map((data, i) => (
        <div className="flex flex-col gap-3" key={i}>
          {data.map((image: ImageBaseProps) => (
            <Frame
              imageData={image}
              className="flex rounded-xl"
              frameClasses=" object-cover"
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default GalleryList;
