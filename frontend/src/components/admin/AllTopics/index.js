import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EditOutlined } from "@ant-design/icons";
import { Table, Button, Typography, Modal, Flex, Card, Tag } from "antd";

import TopicForm from "./components/TopicForm.js";

import {
  getSubjects,
  setSubjectModifyAction,
} from "../../../actions/subject.action";

import {
  headerStruct,
  headingStruct,
  addButtonStruct,
  editButtonStruct,
  staticColumns,
  tableStruct,
} from "./struct.js";

const { Title } = Typography;

const AllTopics = () => {
  const dispatch = useDispatch();

  const subject = useSelector((state) => state.subject);
  const { subjects, subjectsLoading, subjectModalState } = subject;

  const openModal = (subjectId, mode) =>
    dispatch(setSubjectModifyAction(subjectId, true, mode));

  const closeModal = () =>
    dispatch(setSubjectModifyAction(null, false, "COMPLETE"));

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

  useEffect(() => dispatch(getSubjects()), []);

  return (
    <>
      <Card>
        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Title {...headingStruct.title}>List of Subjects</Title>
            <div>
              {subjects && subjects.length && (
                <Tag {...headingStruct.tag}>{subjects.length}</Tag>
              )}
            </div>
          </Flex>
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
          dataSource={subjects}
          loading={subjectsLoading}
        />
      </Card>
      <Modal
        open={subjectModalState}
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
