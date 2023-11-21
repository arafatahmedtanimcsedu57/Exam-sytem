export const headingStruct = {
  gap: "middle",
  justify: "space-between",
  align: "center",
  wrap: "wrap",
};

export const subjectFilterStruct = {
  mode: "multiple",
  placeholder: "Select one or more subjects",
  style: { width: "200px" },
  allowClear: true,
  optionFilterProp: "s",
};

export const addButtonStruct = {
  type: "primary",
};

export const detailsButtonStruct = {
  type: "primary",
  shape: "circle",
};

export const deleteButtonStruct = {
  type: "primary",
  shape: "circle",
  danger: true,
};

export const staticColumns = [
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
    render: (item) => item.topic,
  },
  {
    title: "Question",
    dataIndex: "body",
    key: "body",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (item) => item.name,
  },
];

export const popconfirmStruct = {
  title: "Are you sure？",
  cancelText: "No",
  okText: "Yes",
};

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
  scroll: { x: 700 },
};
