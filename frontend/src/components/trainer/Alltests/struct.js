import { TestProfile } from "../../common/TestProfile";

export const headingStruct = {
  gap: "middle",
  justify: "space-between",
  align: "center",
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

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
  scroll: { x: 700 },
};
