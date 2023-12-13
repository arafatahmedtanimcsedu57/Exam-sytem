import React, { useState, useEffect } from "react";

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
  Card,
} from "antd";
import { headingStruct, addButtonStruct } from "./struct";

import { getSemesters } from "../../../actions/admin.action";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title } = Typography;

const AllSemester = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const { semestersLoading, semesters } = admin;

  console.log(semesters, semestersLoading, "Semesters");

  useEffect(() => dispatch(getSemesters()), []);

  return (
    <>
      <Card>
        {contextHolder}
        <Flex {...headingStruct}>
          <Title level={3}>List of Semesters</Title>
          {/* <Button
            {...addButtonStruct}
            onClick={() => openModal(null, "CREATE")}
          >
            Add New
          </Button> */}
        </Flex>
      </Card>
    </>
  );
};

export default AllSemester;
