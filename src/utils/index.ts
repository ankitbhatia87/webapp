/* 
  Column Size
  2 ==> < 480px
  3 ==> 481px - 768px
  4 ==> 769px - 1024px
  5 ==> 1025px - 1280px
  6 ==> 1281px and aboave
*/

import { ImageBaseProps } from "../ui.kit/Image/interface";

export const getColumnsSize = (screenSize: number): number => {
  // the ideal number of cells initially
  if (screenSize <= 480) return 2;
  if (screenSize > 480 && screenSize <= 768) return 3;
  if (screenSize > 768 && screenSize <= 1024) return 4;
  if (screenSize > 1024 && screenSize <= 1280) return 5;
  if (screenSize > 1280) return 6;
  return 2;
};

export const getColumnsData = (
  data: Array<ImageBaseProps>,
  screenSize: number
) => {
  const columnsList = [];

  const columnDataLength = Math.ceil(data.length / getColumnsSize(screenSize));

  for (let i = 0; i < screenSize; i++) {
    let colData = [];
    colData = data.slice(columnDataLength * i, columnDataLength * (i + 1));
    if (colData.length > 0) columnsList.push(colData); // if last column has no data then skip. the new size will be ideal column - 1
  }

  return columnsList;
};
