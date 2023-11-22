import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Badge, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export const basicInfoStruct = {
    bordered: true,
    title: "",
    column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
};

export const getDescirptionStruct = (
    testdetails,
    mainlink,
    messageApi,
    id
) => [
        {
            key: "1",
            label: "Test Name",
            children: `${testdetails.title}`
        }, {
            key: "2",
            label: "Test Type",
            children: `${testdetails.type}`
        }, {
            key: "3",
            label: "Test Subjects",
            children: <>{testdetails.subjects.map(tag =>
                <Badge status="processing" text={tag.topic.toUpperCase()} />
            )}</>
        }, {
            key: "4",
            label: "Test Link",
            children: <Input
                disabled={true}
                value={`${mainlink}user/conducttest?testid=${id}`}
                addonAfter={
                    <CopyToClipboard
                        text={`${mainlink}user/conducttest?testid=${id}`}
                        onCopy={() =>
                            messageApi.success("Link Copied to clipboard")
                        }
                    >
                        <CopyOutlined />
                    </CopyToClipboard>
                }
            />,
        }, {
            key: "5",
            label: "Created On",
            children: `${moment(testdetails.createdAt).format(
                "DD/MM/YYYY , hh:mm:ss"
            )}`,
        },
    ];