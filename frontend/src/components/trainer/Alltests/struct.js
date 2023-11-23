import { TestProfile } from "../../common/TestProfile";

export const headingStruct = {
  gap: "middle",
  justify: "space-between",
  align: "center",
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

export const getStaticColumns = (getActions) => [
  {
    title: "Test Information",
    dataIndex: "_id",
    key: "_id",
    width: "100%",
    fixed: "left",
    render: (id, data) => <TestProfile details={data} extra={getActions(id)} />,
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
