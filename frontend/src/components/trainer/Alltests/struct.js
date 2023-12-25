import { TestProfile } from "../../common/TestProfile";

export const headerStruct = {
  gap: "middle",
  vertical: true,
  justify: "space-between",
  wrap: "wrap",
};

export const headingStruct = {
  heading: {
    gap: "middle",
    justify: "space-between",
    align: "center",
    wrap: "wrap",
  },

  title: {
    level: 2,
  },

  tag: { color: "processing" },
};

export const actionButtonStruct = {
  gap: "middle",
  justify: "space-between",
  wrap: "wrap",
};

export const menuallyCreateButtonStruct = {
  ghost: true,
  type: "link",
};

export const autoCreateButtonStruct = {
  className: "btn-grad",
};

export const getStaticColumns = (getActions) =>
  // getActions
  [
    {
      title: "Test Information",
      dataIndex: "_id",
      key: "_id",
      render: (id, data) => (
        <TestProfile
          details={data}
          extra={getActions(id, data)}
          showMeta={true}
        />
      ),
    },
  ];

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
};
