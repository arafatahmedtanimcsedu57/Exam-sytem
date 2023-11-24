import { UserProfile } from "../../../common/UserProfile";

export const getCandidateStaticColumns = (getActions) => [
  {
    title: "Candidate Information",
    dataIndex: "_id",
    key: "_id",
    width: "100%",
    fixed: "left",
    render: (id, data) => (
      <UserProfile details={data} extra={getActions(id)} showMeta={true} />
    ),
  },
];

export const tableStruct = {
  rowKey: "_id",
  pagination: { pageSize: 5 },
  scroll: { x: 700 },
};
