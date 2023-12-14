export const headingStruct = {
  gap: "middle",
  justify: "space-between",
  align: "center",
};

export const addButtonStruct = {
  type: "primary",
};

export const editButtonStruct = {
  type: "primary",
  shape: "circle",
};

export const staticColumns = [
  {
    title: "Semester",
    dataIndex: "name",
    key: "name",
    width: "50%",
    fixed: true,
  },

  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    width: "40%",
    fixed: true,
  },
];

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
};
