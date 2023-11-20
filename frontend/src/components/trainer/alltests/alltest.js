import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import { connect } from "react-redux";
import { Table, Input, Button, Typography, Modal, Tag } from "antd";
import moment from "moment";

import {
  ChangeTestSearchText,
  ChangeTestTableData,
  ChangeTestDetailsModalState,
} from "../../../actions/trainerAction";

import TestDetails from "../testdetails/testdetails";

import "./alltest.css";
class AllTests extends Component {
  openModal = (id) => {
    this.props.ChangeTestDetailsModalState(true, id);
  };

  closeModal = () => {
    this.props.ChangeTestDetailsModalState(false, null);
  };
  componentDidMount() {
    this.props.ChangeTestTableData();
  }

  render() {
    const { Title } = Typography;
    const columns = [
      {
        title: "Name",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Subjects",
        dataIndex: "subjects",
        key: "subjects._id",
        render: (tags) => (
          <span>
            {tags.map((tag, i) => {
              let color = "geekblue";
              return (
                <Tag color={color} key={tag._id}>
                  {tag.topic.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "Created on",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (tags) => <span>{moment(tags).format("DD/ MM/YYYY")}</span>,
      },
      {
        title: "Action",
        key: "_id",
        dataIndex: "_id",
        render: (key) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon="info-circle"
              onClick={() => this.openModal(key)}
            />
          </span>
        ),
      },
    ];
    return (
      <div className="test-list">
        <div className="test-list__heading">
          <Title level={3}>List of Tests</Title>
        </div>
        <Table
          bordered={true}
          columns={columns}
          dataSource={this.props.trainer.TestTableData}
          size="large"
          pagination={{ pageSize: 5 }}
          loading={this.props.trainer.TestTableLoading}
          rowKey="_id"
          className="test-list__table"
        />

        <Modal
          visible={this.props.trainer.TestDetailsmodalOpened}
          title="Test details"
          onOk={this.handleOk}
          onCancel={this.closeModal}
          afterClose={this.closeModal}
          style={{
            top: "20px",
            padding: "0px",
            backgroundColor: "rgb(155,175,190)",
          }}
          width="90%"
          destroyOnClose={true}
          footer={[]}
        >
          <TestDetails />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trainer: state.trainer,
});

export default connect(mapStateToProps, {
  ChangeTestSearchText,
  ChangeTestTableData,
  ChangeTestDetailsModalState,
})(AllTests);
