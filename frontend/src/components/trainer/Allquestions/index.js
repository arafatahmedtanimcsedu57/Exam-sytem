import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Divider,
  Modal,
  Select,
  Flex,
  message,
  Card,
} from "antd";
import {
  headingStruct,
  subjectFilterStruct,
  addButtonStruct,
  detailsButtonStruct,
  deleteButtonStruct,
  staticColumns,
  popconfirmStruct,
  tableStruct,
} from "./struct";

import {
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeSelectedSubjects,
} from "../../../actions/trainerAction";
import { ChangeSubjectTableData } from "../../../actions/adminAction";

import NewQuestionForm from "../NewQuestions";
import QuestionDetails from "../QuestionDetails";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllQuestions = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const trainer = useSelector((state) => state.trainer);

  const [questiondetailsId, setQuestiondetailsId] = useState(null);
  const [
    questiondetailsModelVisible,
    setQuestiondetailsModelVisible,
  ] = useState(false);

  const opendetailsModal = (id) => {
    setQuestiondetailsId(id);
    setQuestiondetailsModelVisible(true);
  };

  const closedetailsModal = () => {
    setQuestiondetailsId(null);
    setQuestiondetailsModelVisible(false);
  };

  const openNewModal = (mode) => dispatch(ChangeQuestionModalState(true));
  const closeNewModal = () => dispatch(ChangeQuestionModalState(false));

  const handleSubjectChange = (s) => {
    dispatch(ChangeSelectedSubjects(s));
    dispatch(ChangeQuestionTableData(s));
  };

  const deleteQuestion = (id) => {
    SecurePost({
      url: `${apis.DELETE_QUESTION}`,
      data: {
        _id: id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(ChangeQuestionTableData(trainer.selectedSubjects));
          return messageApi.success(response.data.message);
        } else return messageApi.warning(response.data.message);
      })
      .catch((error) => messageApi.error("Server Error"));
  };

  useEffect(() => {
    dispatch(ChangeSubjectTableData());
    dispatch(ChangeQuestionTableData(trainer.selectedSubjects));
  }, []);

  const columns = [
    ...staticColumns,
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",

      render: (key) => (
        <>
          <Button
            {...detailsButtonStruct}
            onClick={() => opendetailsModal(key)}
            icon={<InfoCircleOutlined />}
          />
          <Divider type="vertical" />
          <Popconfirm
            {...popconfirmStruct}
            onConfirm={() => deleteQuestion(key)}
          >
            <Button {...deleteButtonStruct} icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Card>
        {contextHolder}
        <Flex {...headingStruct}>
          <Title level={3}>List of Questions</Title>

          <Select
            {...subjectFilterStruct}
            defaultValue={trainer.selectedSubjects}
            onChange={handleSubjectChange}
          >
            {admin.subjectTableData.map((item) => (
              <Select.Option key={item._id} value={item._id} s={item.topic}>
                {item.topic}
              </Select.Option>
            ))}
          </Select>

          <Button
            {...addButtonStruct}
            onClick={() => openNewModal("Add New Question")}
          >
            Add New Question
          </Button>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainer.QuestionTableData}
          loading={trainer.QuestionTableLoading}
        />
      </Card>

      <Modal
        open={trainer.NewQuestionmodalOpened}
        title="Add New Question"
        onCancel={closeNewModal}
        destroyOnClose={true}
        footer={[]}
      >
        <NewQuestionForm />
      </Modal>

      <Modal
        open={questiondetailsModelVisible}
        title="Question Details"
        onCancel={closedetailsModal}
        destroyOnClose={true}
        footer={[]}
      >
        <QuestionDetails id={questiondetailsId} />
      </Modal>
    </>
  );
};

export default AllQuestions;
