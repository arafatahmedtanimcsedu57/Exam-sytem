import React, { Component } from "react";
import {
  Table,
  Button,
  Typography,
  Popconfirm,
  Divider,
  Modal,
  Select,
} from "antd";
import { connect } from "react-redux";

import {
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
  ChangeSelectedSubjects,
} from "../../../actions/trainerAction";
import { ChangeSubjectTableData } from "../../../actions/adminAction";

import Alert from "../../../components/common/alert";
import NewQuestionForm from "../newquestion/newquestion";
import QuestionDetails from "../questionDetails/questiondetails";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import "./allquestion.css";
class AllQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questiondetailsId: null,
      questiondetailsModelVisible: false,
    };
  }
  OpendetailsModal = (id) => {
    this.setState((previousState, previousProps) => {
      return {
        questiondetailsId: id,
        questiondetailsModelVisible: true,
      };
    });
  };
  ClosedetailsModal = () => {
    this.setState((previousState, previousProps) => {
      return {
        questiondetailsId: null,
        questiondetailsModelVisible: false,
      };
    });
  };

  componentDidMount() {
    this.props.ChangeSubjectTableData();
    this.props.ChangeQuestionTableData(this.props.trainer.selectedSubjects);
  }

  openNewModal = (mode) => {
    this.props.ChangeQuestionModalState(true);
  };

  closeNewModal = () => {
    this.props.ChangeQuestionModalState(false);
  };

  handleSubjectChange = (s) => {
    this.props.ChangeSelectedSubjects(s);
    this.props.ChangeQuestionTableData(s);
  };

  deleteQuestion = (id) => {
    SecurePost({
      url: `${apis.DELETE_QUESTION}`,
      data: {
        _id: id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          Alert("success", "Success", response.data.message);
          this.props.ChangeQuestionTableData(
            this.props.trainer.selectedSubjects
          );
        } else {
          return Alert("warning", "Warning!", response.data.message);
        }
      })
      .catch((error) => {
        return Alert("error", "Error!", "Server Error");
      });
  };

  render() {
    const { Title } = Typography;
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
              onClick={() => this.OpendetailsModal(key)}
              icon="info-circle"
            />
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure？"
              cancelText="No"
              okText="Yes"
              onConfirm={() => {
                this.deleteQuestion(key);
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
            onClick={() => this.openNewModal("Add New Question")}
          >
            Add New Question
          </Button>
        </div>

        <Select
          mode="multiple"
          placeholder="Select one or more subjects"
          defaultValue={this.props.trainer.selectedSubjects}
          onChange={this.handleSubjectChange}
          style={{ width: "100%" }}
          allowClear={true}
          optionFilterProp="s"
          size="large"
        >
          {this.props.admin.subjectTableData.map((item) => (
            <Select.Option key={item._id} value={item._id} s={item.topic}>
              {item.topic}
            </Select.Option>
          ))}
        </Select>

        <Table
          columns={columns}
          dataSource={this.props.trainer.QuestionTableData}
          size="large"
          pagination={{ pageSize: 5 }}
          loading={this.props.trainer.QuestionTableLoading}
          rowKey="_id"
          className="question-list__table"
        />

        <Modal
          visible={this.props.trainer.NewQuestionmodalOpened}
          title="Add New Question"
          onCancel={this.closeNewModal}
          destroyOnClose={true}
          width="100%"
          footer={[]}
        >
          <NewQuestionForm />
        </Modal>

        <Modal
          visible={this.state.questiondetailsModelVisible}
          title="Question Details"
          onCancel={this.ClosedetailsModal}
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
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trainer: state.trainer,
  admin: state.admin,
});

export default connect(mapStateToProps, {
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
  ChangeSelectedSubjects,
  ChangeSubjectTableData,
})(AllQuestions);
