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
  Space,
  Tag,
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
  headerStruct,
  actionButtonStruct,
  uploadButtonStruct,
  createTestButtonStruct,
} from "./struct";

import {
  getQuestions,
  setQuestionModifyAction,
  setQuestionUploadAction,
} from "../../../actions/question.action";
import { getTags } from "../../../actions/tag.action";
import { setTestAction } from "../../../actions/trainerTest.action";
import { getTrainerSubject } from "../../../actions/trainerSubject.action";

import NewQuestionForm from "./components/NewQuestion";
import UploadNewQuestions from "./components/UploadQuestions";
import TestForm from "../../common/TestForm";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllQuestions = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showCreateTest, setShowCreateTest] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const question = useSelector((state) => state.question);
  const {
    questions,
    questionsLoading,
    questionUploadModalState,
    questionModalState,
  } = question;

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestModalState } = trainerTest;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

  // Modals
  const openModal = (questionId, mode) =>
    dispatch(setQuestionModifyAction(questionId, true, mode));
  const closeModal = () =>
    dispatch(setQuestionModifyAction(null, false, "COMPLETE"));

  const openUploadModal = (mode) =>
    dispatch(setQuestionUploadAction(true, mode));
  const closUploadeModal = () =>
    dispatch(setQuestionUploadAction(false, "COMPLETE"));

  const openTestModal = (mode) => dispatch(setTestAction(true, mode));
  const closTestModal = () => dispatch(setTestAction(false, "COMPLETE"));
  // Modals

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

  const fetchQuestions = () => {
    trainerSubjectIds &&
      trainerSubjectIds.length &&
      dispatch(
        getQuestions([...selectedSubjects, ...trainerSubjectIds], selectedTags)
      );
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys, selectedRows);
      setSelectedQuestions(selectedRowKeys);
      if (selectedRowKeys.length) setShowCreateTest(true);
      else setShowCreateTest(false);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedSubjects, selectedTags, trainerSubject]);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getTrainerSubject(userDetails._id));
  }, []);

  return (
    <>
      <Card>
        {contextHolder}

        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Space>
              <Title {...headingStruct.title}>Questions</Title>
              <div>
                {questions && questions.length && (
                  <Tag {...headingStruct.tag}>{questions.length}</Tag>
                )}
              </div>
            </Space>
            <Flex {...actionButtonStruct}>
              {showCreateTest && (
                <Button
                  {...createTestButtonStruct}
                  onClick={() => openTestModal("CREATE")}
                >
                  Create New Test
                </Button>
              )}

              <Button
                {...addButtonStruct}
                onClick={() => openModal(null, "CREATE")}
              >
                Add New Question
              </Button>

              <Button
                {...uploadButtonStruct}
                onClick={() => openUploadModal("UPLOAD")}
              >
                Upload Questions
              </Button>
            </Flex>
          </Flex>
          <Flex {...filterStruct}>
            <Select {...subjectFilterStruct} onChange={handleSubjectChange}>
              {subjects.map((subject) => (
                <Select.Option
                  key={subject._id}
                  value={subject._id}
                  s={subject.topic}
                >
                  {subject.topic}
                </Select.Option>
              ))}
            </Select>

            <Select {...tagFilterStruct} onChange={handleTagChange}>
              {tags.map((tag) => (
                <Select.Option key={tag._id} value={tag._id} s={tag.label}>
                  {tag.label}
                </Select.Option>
              ))}
            </Select>
          </Flex>
        </Flex>

        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
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

      <Modal
        open={trainerTestModalState}
        title="Create Test"
        onCancel={closTestModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TestForm selectedQuestions={selectedQuestions} />
      </Modal>
    </>
  );
};

export default AllQuestions;
