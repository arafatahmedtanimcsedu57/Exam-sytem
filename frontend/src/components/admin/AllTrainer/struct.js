import { UserProfile } from "./../../common/UserProfile";

export const headerStruct = {
  gap: "middle",
  justify: "space-between",
  align: "center",
  wrap: "wrap",
};

export const headingStruct = {
  heading: { gap: "middle", justify: "space-between", align: "center" },
  title: { level: 2 },
  tag: { color: "processing" },
};

export const addButtonStruct = {
  type: "primary",
};

export const editButtonStruct = {
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
    title: "Trainer Information",
    dataIndex: "_id",
    key: "_id",
    width: "100%",
    fixed: "left",
    render: (id, data) => (
      <UserProfile details={data} extra={getActions(id)} showMeta={true} />
    ),
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
};
