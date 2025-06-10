import { useEffect, useState } from "react";
import Frame from "../../ui.kit/Frame";
import { getColumnsData, getColumnsSize } from "../../utils";
import { GalleryListProps } from "./interface";

const GalleryList = (props: GalleryListProps) => {
  const { data } = props;
  const [columnSize, setColumnSize] = useState<number>(getColumnsSize());

  const [columnsData, setColumnsData] = useState<Array<any>>(
    getColumnsData(data, columnSize)
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setTimeout(() => {
        const _columnsData = getColumnsData(data, columnSize);
        console.info(_columnsData);
        setColumnSize(getColumnsSize());
        setColumnsData(_columnsData);
      }, 1000);
    };

    window.addEventListener("resize", handleWindowResize);
    // return window.removeEventListener("resize", handleWindowResize);
  }, [columnSize]);

  return (
    <>
      {columnsData.map((data, i) => (
        <div className="flex flex-col gap-3" key={i}>
          {data.map((image: any) => (
            <Frame imageData={image} className="w-[250px] float-left" />
          ))}
        </div>
      ))}
    </>
  );
};

export default GalleryList;
