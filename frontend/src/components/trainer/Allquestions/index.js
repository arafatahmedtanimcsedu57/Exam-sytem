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
} from "./struct";

import {
  getQuestions,
  setQuestionModifyAction,
  setQuestionUploadAction,
} from "../../../actions/question.action";
import { getTags } from "../../../actions/tag.action";
import { getTrainerSubject } from "../../../actions/trainerSubject.action";

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

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;
  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

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

  const fetchQuestions = () => {
    console.log(trainerSubjectIds, selectedTags, selectedSubjects);

    trainerSubjectIds &&
      trainerSubjectIds.length &&
      dispatch(
        getQuestions([...selectedSubjects, ...trainerSubjectIds], selectedTags)
      );
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => fetchQuestions(), [selectedSubjects, selectedTags]);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getTrainerSubject(userDetails._id));
  }, []);

  return (
    <>
      <Card>
        {contextHolder}

        <Flex {...headerStruct}>
          <Flex {...headingStruct}>
            <Title level={3}>List of Questions</Title>
            <Flex {...actionButtonStruct}>
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
    </>
  );
};

export default AllQuestions;
