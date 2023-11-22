import moment from "moment";

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

export const staticColumns = [
    {
        title: "Name",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    }, {
        title: "Created on",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (tags) => moment(tags).format("DD/ MM/YYYY"),
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
