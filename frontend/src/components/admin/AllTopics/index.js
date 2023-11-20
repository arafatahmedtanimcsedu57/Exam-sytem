import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { Table, Button, Typography, Modal, Flex } from "antd";
import {
  headingStruct,
  addButtonStruct,
  editButtonStruct,
  staticColumns,
  tableStruct,
} from "./struct.js";

import {
  ChangeSubjectTableData,
  ChangeSubjectModalState,
} from "../../../actions/adminAction";

import NewSubjectForm from "../NewTopics/index.js";

const { Title } = Typography;

const AllTopics = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const openModal = (id, mode) =>
    dispatch(ChangeSubjectModalState(true, id, mode));

  const closeModal = () =>
    dispatch(ChangeSubjectModalState(false, null, "New Topic"));

  useEffect(() => {
    dispatch(ChangeSubjectTableData());
  }, []);

  console.log(admin.subjectTableData);

  const columns = [
    ...staticColumns,
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (key) => (
        <Button
          {...editButtonStruct}
          icon={<EditOutlined />}
          onClick={() => openModal(key, "Save Changes")}
        />
      ),
    },
  ];
  return (
    <>
      <Flex {...headingStruct}>
        <Title level={3}>List of Subjects</Title>
        <Button
          {...addButtonStruct}
          onClick={() => openModal(null, "New Topic")}
        >
          Add New
        </Button>
      </Flex>
      <Table
        {...tableStruct}
        columns={columns}
        dataSource={admin.subjectTableData}
        loading={admin.SubjectTableLoading}
      />

      <Modal
        open={admin.SubjectmodalOpened}
        title="Add New Subject"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <NewSubjectForm />
      </Modal>
    </>
  );
};

export default AllTopics;
