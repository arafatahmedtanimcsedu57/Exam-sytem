import React, { useEffect, useState } from "react";
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

import {
  headingStruct,
  subjectFilterStruct,
  addButtonStruct,
  deleteButtonStruct,
  getStaticColumns,
  popconfirmStruct,
  tableStruct,
  tagFilterStruct,
  filterStruct,
} from "./struct";

import {
  getQuestions,
  setQuestionModifyAction,
  setQuestionUploadAction,
} from "../../../actions/question.action";
import { getSubjects } from "../../../actions/subject.action";
import { getTags } from "../../../actions/tag.action";

import NewQuestionForm from "./components/NewQuestion";
import UploadNewQuestions from "./components/UploadQuestions";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllQuestions = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const question = useSelector((state) => state.question);
  const {
    questions,
    questionsLoading,
    questionUploadModalState,
    questionModalState,
  } = question;

  const subject = useSelector((state) => state.subject);
  const { subjects } = subject;

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const openModal = (questionId, mode) =>
    dispatch(setQuestionModifyAction(questionId, true, mode));
  const closeModal = () =>
    dispatch(setQuestionModifyAction(null, false, "COMPLETE"));

  const openUploadModal = (mode) =>
    dispatch(setQuestionUploadAction(true, mode));
  const closUploadeModal = () =>
    dispatch(setQuestionUploadAction(false, "COMPLETE"));

  const handleSubjectChange = (selectedSubjects) =>
    setSelectedSubjects(selectedSubjects);

  const handleTagChange = (selectedTags) => setSelectedTags(selectedTags);

  const deleteQuestion = (questionId) => {
    SecurePost({
      url: `${apis.QUESTION}/delete`,
      data: { questionId },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getQuestions());
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

  const fetchQuestions = () =>
    dispatch(getQuestions(selectedSubjects, selectedTags));

  useEffect(() => fetchQuestions(), [selectedSubjects, selectedTags]);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getSubjects());
  }, []);

  return (
    <>
      <Card>
        {contextHolder}

        <Flex vertical gap="middle">
          <Flex {...headingStruct}>
            <Title level={3}>List of Questions</Title>
            <Button
              {...addButtonStruct}
              onClick={() => openModal(null, "CREATE")}
            >
              Add New Question
            </Button>

            <Button
              {...addButtonStruct}
              onClick={() => openUploadModal("UPLOAD")}
            >
              Upload Questions
            </Button>
          </Flex>
          <Flex {...filterStruct}>
            <Select {...subjectFilterStruct} onChange={handleSubjectChange}>
              {subjects.map((item) => (
                <Select.Option key={item._id} value={item._id} s={item.topic}>
                  {item.topic}
                </Select.Option>
              ))}
            </Select>

            <Select {...tagFilterStruct} onChange={handleTagChange}>
              {tags.map((item) => (
                <Select.Option key={item._id} value={item._id} s={item.label}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Flex>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={questions}
          loading={questionsLoading}
        />
      </Card>

      <Modal
        open={questionModalState}
        title="Add New Question"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <NewQuestionForm fetchQuestions={fetchQuestions} />
      </Modal>

      <Modal
        open={questionUploadModalState}
        title="Upload Questions"
        onCancel={closUploadeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <UploadNewQuestions fetchQuestions={fetchQuestions} />
      </Modal>
    </>
  );
};

export default AllQuestions;
