import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EditOutlined } from "@ant-design/icons";
import { Table, Button, Typography, Modal, Flex, Card } from "antd";

import TopicForm from "./components/TopicForm.js";

import {
  handleSubjectTableData,
  handleSubjectModalState,
} from "../../../actions/admin.action.js";

import {
  headingStruct,
  addButtonStruct,
  editButtonStruct,
  staticColumns,
  tableStruct,
} from "./struct.js";

const { Title } = Typography;

const AllTopics = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const openModal = (id, mode) =>
    dispatch(handleSubjectModalState(true, id, mode));

  const closeModal = () =>
    dispatch(handleSubjectModalState(false, null, "COMPLETE"));

  useEffect(() => {
    dispatch(handleSubjectTableData());
  }, []);

  const columns = [
    ...staticColumns,
    {
      title: "",
      key: "_id",
      dataIndex: "_id",
      render: (key) => (
        <Button
          {...editButtonStruct}
          icon={<EditOutlined />}
          onClick={() => openModal(key, "UPDATE")}
        />
      ),
    },
  ];
  return (
    <>
      <Card>
        <Flex {...headingStruct}>
          <Title level={3}>List of Subjects</Title>
          <Button
            {...addButtonStruct}
            onClick={() => openModal(null, "CREATE")}
          >
            Add New
          </Button>
        </Flex>
        <Table
          {...tableStruct}
          columns={columns}
          dataSource={admin.subjectTableData}
          loading={admin.subjectTableLoading}
        />
      </Card>
      <Modal
        open={admin.subjectModalState}
        title="Add New Subject"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TopicForm />
      </Modal>
    </>
  );
};

export default AllTopics;
