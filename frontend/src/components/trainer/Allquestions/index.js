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
  handleQuestionModalState,
  handleQuestionTableData,
  handleSelectedSubjects,
} from "../../../actions/trainer.action";
import { handleSubjectTableData } from "../../../actions/admin.action";

import NewQuestionForm from "./components/NewQuestion";

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

  const openNewModal = () => dispatch(handleQuestionModalState(true));
  const closeNewQuestionModal = () => dispatch(handleQuestionModalState(false));

  const handleSubjectChange = (s) => {
    dispatch(handleSelectedSubjects(s));
    dispatch(handleQuestionTableData(s));
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
          dispatch(handleQuestionTableData(trainer.selectedSubjects));
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
    dispatch(handleSubjectTableData()); // This is used for subject select options
    dispatch(handleQuestionTableData(trainer.selectedSubjects));
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
          dataSource={trainer.questionTableData}
          loading={trainer.questionTableLoading}
        />
      </Card>

      <Modal
        open={trainer.questionModalState}
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
