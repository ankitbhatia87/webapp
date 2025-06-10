export const getColumnsSize = () => {
  // the ideal number of cells initially
  const numberOfColumns = Math.ceil(window.innerWidth / 270);

  return numberOfColumns;
};

export const getColumnsData = (data: any, size: number) => {
  const columnsList = [];

  const columnDataLength = Math.ceil(data.length / size);

  for (let i = 0; i < size; i++) {
    let colData = [];
    colData = data.slice(columnDataLength * i, columnDataLength * (i + 1));
    if (colData.length > 0) columnsList.push(colData); // if last column has no data then skip. the new size will be ideal column - 1
  }

  return columnsList;
};
