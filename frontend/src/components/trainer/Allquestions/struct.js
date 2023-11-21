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

export const deleteButtonStruct = {
    type: "primary",
    shape: "circle",
    danger: true,
};

export const staticColumns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "25%",
        fixed: "left",
    },
    {
        title: "Email Id",
        dataIndex: "emailid",
        key: "emailid",
        width: "25%",
    },
    {
        title: "Contact Number",
        dataIndex: "contact",
        key: "contact",
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
