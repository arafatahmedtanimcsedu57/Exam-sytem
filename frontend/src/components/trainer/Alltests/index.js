import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InfoCircleOutlined } from "@ant-design/icons";
import { Table, Button, Typography, Modal, Tag, Card, Flex } from "antd";

import {
  ChangeTestTableData,
  ChangeTestDetailsModalState,
} from "../../../actions/trainerAction";

import TestDetails from "./components/Testdetails";

import {
  headingStruct,
  staticColumns,
  tableStruct,
  detailsButtonStruct,
} from "./struct";

const { Title } = Typography;

const AllTests = () => {
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);

  const openModal = (id) => dispatch(ChangeTestDetailsModalState(true, id));

  const closeModal = () => dispatch(ChangeTestDetailsModalState(false, null));

  useEffect(() => {
    dispatch(ChangeTestTableData());
  }, []);

  const columns = [
    ...staticColumns,
    {
      title: "Subjects",
      dataIndex: "subjects",
      key: "subjects._id",
      render: (tags) =>
        tags.map((tag, i) => {
          let color = "geekblue";
          return (
            <Tag color={color} key={tag._id}>
              {tag.topic.toUpperCase()}
            </Tag>
          );
        }),
    },

    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (key) => (
        <Button
          {...detailsButtonStruct}
          icon={<InfoCircleOutlined />}
          onClick={() => openModal(key)}
        />
      ),
    },
  ];

  return (
    <>
      <Card>
        <Flex {...headingStruct}>
          <Title level={3}>List of Tests</Title>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainer.TestTableData}
          loading={trainer.TestTableLoading}
        />
      </Card>
      <Modal
        open={trainer.TestDetailsmodalOpened}
        title="Test details"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TestDetails />
      </Modal>
    </>
  );
};

export default AllTests;
