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
    title: "Subject Name",
    dataIndex: "topic",
    key: "topic",
    width: "90%",
    fixed: true,
  },
];

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
};
