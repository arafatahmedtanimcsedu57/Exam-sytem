import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Typography,
  Card,
  Flex,
  Modal,
  Button,
  Space,
  Tag,
  message,
} from "antd";

import { getTests } from "../../../actions/trainerTest.action";
import { getTags } from "../../../actions/tag.action";
import { getTrainerSubject } from "../../../actions/trainerSubject.action";
import { setTestAction } from "../../../actions/trainerTest.action";

import CandidateResults from "./components/Result";
import TestForm from "../../common/TestForm";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  headingStruct,
  getStaticColumns,
  tableStruct,
  actionButtonStruct,
  autoCreateButtonStruct,
  menuallyCreateButtonStruct,
  headerStruct,
} from "./struct";

const { Title, Text } = Typography;

const AllTests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const trainerTest = useSelector((state) => state.trainerTest);
  const {
    trainerTests,
    trainerTestModalState,
    trainerTestsLoading,
  } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

  const openTestModal = (mode) => dispatch(setTestAction(true, mode));
  const closTestModal = () => dispatch(setTestAction(false, "COMPLETE"));

  const columns = [...getStaticColumns()];

  const fetchTests = () => {
    trainerSubjectIds &&
      trainerSubjectIds.length &&
      dispatch(getTests(trainerSubjectIds));
  };

  useEffect(() => fetchTests(), [trainerSubjects]);

  return (
    <>
      <Card>
        <Flex {...headerStruct}>
          <Flex {...headingStruct.heading}>
            <Space>
              <Title {...headingStruct.title}>Tests</Title>
              <div>
                {trainerTests && trainerTests.length && (
                  <Tag {...headingStruct.tag}>{trainerTests.length}</Tag>
                )}
              </div>
            </Space>

            <Flex {...actionButtonStruct}>
              <Button
                {...autoCreateButtonStruct}
                onClick={() => openTestModal("START AUTO GENERATION")}
              >
                Create Test With Auto Generated Questions
              </Button>

              <Button
                {...menuallyCreateButtonStruct}
                onClick={() => navigate("/user/listquestions")}
              >
                Create Test Menually
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainerTests}
          loading={trainerTestsLoading}
        />
      </Card>

      <Modal
        open={trainerTestModalState}
        title="Create Test"
        onCancel={closTestModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TestForm />
      </Modal>
    </>
  );
};

export default AllTests;
