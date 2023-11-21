import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Card
} from "antd";
import {
  headingStruct,
  addButtonStruct,
  editButtonStruct,
  deleteButtonStruct,
  staticColumns,
  popconfirmStruct,
  tableStruct,
} from "./struct";

import {
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
  ChangeSelectedSubjects,
} from "../../../actions/trainerAction";
import { ChangeSubjectTableData } from "../../../actions/adminAction";

// import NewQuestionForm from "../newquestion/newquestion";
// import QuestionDetails from "../questionDetails/questiondetails";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllQuestions = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const trainer = useSelector((state) => state.trainer);

  const [questiondetailsId, setQuestiondetailsId] = useState(null);
  const [questiondetailsModelVisible, setQuestiondetailsModelVisible] = useState(false);

  const opendetailsModal = (id) => {
    setQuestiondetailsId(id);
    setQuestiondetailsModelVisible(true);
  };

  const closedetailsModal = () => {
    setQuestiondetailsId(null);
    setQuestiondetailsModelVisible(false);
  };

  const openNewModal = (mode) => dispatch(ChangeQuestionModalState(true))
  const closeNewModal = () => dispatch(ChangeQuestionModalState(false))

  useEffect(() => {
    dispatch(ChangeSubjectTableData())
    dispatch(ChangeQuestionTableData(trainer.selectedSubjects))
  }, [])

  const handleSubjectChange = (s) => {
    dispatch(ChangeSelectedSubjects(s))
    dispatch(ChangeQuestionTableData(s))
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
          messageApi.success(response.data.message);
          dispatch(ChangeQuestionTableData(
            trainer.selectedSubjects
          ))
        } else {
          return messageApi.warning(response.data.message);
        }
      })
      .catch((error) => messageApi.error("Server Error")
      );
  };

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject.topic",
      key: "subject.topic",
    },
    {
      title: "Question",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Created By",
      dataIndex: "createdBy.name",
      key: "createdBy.name",
    },

    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",

      render: (key) => (
        <div className="question-list__table-actions">
          <Button
            type="primary"
            shape="circle"
            onClick={() => opendetailsModal(key)}
            icon="info-circle"
          />
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure？"
            cancelText="No"
            okText="Yes"
            onConfirm={() => {
              deleteQuestion(key);
            }}
          // icon={<Icon type="delete" style={{ color: "red" }} />}
          >
            <Button type="danger" shape="circle" icon="delete" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className="question-list">
      <div className="question-list__heading">
        <Title level={3}>List of Questions</Title>

        <Button
          type="primary"
          size="large"
          onClick={() => openNewModal("Add New Question")}
        >
          Add New Question
        </Button>
      </div>

      <Select
        mode="multiple"
        placeholder="Select one or more subjects"
        defaultValue={trainer.selectedSubjects}
        onChange={handleSubjectChange}
        style={{ width: "100%" }}
        allowClear={true}
        optionFilterProp="s"
        size="large"
      >
        {admin.subjectTableData.map((item) => (
          <Select.Option key={item._id} value={item._id} s={item.topic}>
            {item.topic}
          </Select.Option>
        ))}
      </Select>

      <Table
        columns={columns}
        dataSource={trainer.QuestionTableData}
        size="large"
        pagination={{ pageSize: 5 }}
        loading={trainer.QuestionTableLoading}
        rowKey="_id"
        className="question-list__table"
      />

      {/* <Modal
        open={trainer.NewQuestionmodalOpened}
        title="Add New Question"
        onCancel={closeNewModal}
        destroyOnClose={true}
        width="100%"
        footer={[]}
      >
        <NewQuestionForm />
      </Modal> */}

      {/* <Modal
        open={questiondetailsModelVisible}
        title="Question Details"
        onCancel={ClosedetailsModal}
        style={{
          top: "20px",
          padding: "0px",
          backgroundColor: "rgb(155,175,190)",
        }}
        width="70%"
        destroyOnClose={true}
        footer={[]}
      >
        <QuestionDetails id={this.state.questiondetailsId} />
      </Modal> */}
    </div>
  );
}

export default AllQuestions