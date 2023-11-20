import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Button,
  Typography,
  Divider,
  Modal,
  Popconfirm,
  Flex,
  message,
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
  ChangeTrainerTableData,
  ChangeTrainerModalState,
} from "../../../actions/adminAction";

import NewTrainerForm from "../NewTrainer";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllTrainer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const openModal = (id, mode) =>
    dispatch(ChangeTrainerModalState(true, id, mode));

  const closeModal = () =>
    dispatch(ChangeTrainerModalState(false, null, "Register"));

  const deleteTrainer = (id) => {
    SecurePost({
      url: `${apis.DELETE_TRAINER}`,
      data: {
        _id: id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(ChangeTrainerTableData());
          messageApi.success(response.data.message);
        } else messageApi.warning(response.data.message);
      })
      .catch((error) => messageApi.error("Server Error"));
  };

  useEffect(() => dispatch(ChangeTrainerTableData()), []);

  const columns = [
    ...staticColumns,
    {
      title: "Action",
      key: "_id",
      dataIndex: "_id",
      render: (key) => (
        <>
          <Button
            {...editButtonStruct}
            icon={<EditOutlined />}
            onClick={() => openModal(key, "Save Changes")}
          />
          <Divider type="vertical" />
          <Popconfirm
            {...popconfirmStruct}
            onConfirm={() => deleteTrainer(key)}
          >
            <Button {...deleteButtonStruct} icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Flex {...headingStruct}>
        <Title level={3}>List of Trainer</Title>
        <Button
          {...addButtonStruct}
          onClick={() => openModal(null, "Register")}
        >
          Add New
        </Button>
      </Flex>
      <Table
        {...tableStruct}
        columns={columns}
        dataSource={admin.trainerTableData}
        loading={admin.trainerTableLoadingStatus}
      />

      <Modal
        open={admin.TrainermodalOpened}
        title="Add New Trainer"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <NewTrainerForm />
      </Modal>
    </>
  );
};

export default AllTrainer;
