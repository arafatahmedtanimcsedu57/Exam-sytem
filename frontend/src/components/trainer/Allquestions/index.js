import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Modal,
  Select,
  Flex,
  message,
  Card,
} from "antd";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeSelectedSubjects,
} from "../../../actions/trainerAction";
import { ChangeSubjectTableData } from "../../../actions/adminAction";

import NewQuestionForm from "./components/NewQuestion.js";

import {
  headingStruct,
  subjectFilterStruct,
  addButtonStruct,
  deleteButtonStruct,
  getStaticColumns,
  popconfirmStruct,
  tableStruct,
} from "./struct";

const { Title } = Typography;

const AllQuestions = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const trainer = useSelector((state) => state.trainer);

  const openNewModal = () => dispatch(ChangeQuestionModalState(true));
  const closeNewQuestionModal = () => dispatch(ChangeQuestionModalState(false));

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
      .catch(() => messageApi.error("Server Error"));
  };

  const getActions = (key) => (
    <Popconfirm {...popconfirmStruct} onConfirm={() => deleteQuestion(key)}>
      <Button {...deleteButtonStruct} icon={<DeleteOutlined />} />
    </Popconfirm>
  );

  const columns = [...getStaticColumns(getActions)];

  useEffect(() => {
    dispatch(ChangeSubjectTableData());
    dispatch(ChangeQuestionTableData(trainer.selectedSubjects));
  }, []);

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
        onCancel={closeNewQuestionModal}
        destroyOnClose={true}
        footer={[]}
      >
        <NewQuestionForm />
      </Modal>
    </>
  );
};

export default AllQuestions;
