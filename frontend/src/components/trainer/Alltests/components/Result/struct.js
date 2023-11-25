import { Badge } from "antd";
import { UserProfile } from "../../../../common/UserProfile";

export const getCandidateResultsStaticColumns = (getActions) => [
    {
        title: "Candidate Information",
        dataIndex: "_id",
        key: "_id",
        width: "100%",
        fixed: "left",
        render: (id, data) => {
            return (
                <>
                    <Badge.Ribbon text={`Score: ${data.score}`}>
                        <UserProfile details={data.userid} extra={getActions(id)} showMeta={false} />
                    </Badge.Ribbon>
                </>
            )
        },
    },
];

export const tableStruct = {
    rowKey: "_id",
    pagination: { pageSize: 5 },

};
