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
import { getSectionBySubject } from "../../../actions/section.action";

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

  const [messageApi, contextHolder] = message.useMessage();

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

  const sections = useSelector((state) => state.section);
  const { sectionsBySubject, sectionsBySubjectLoading } = sections;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

  const openTestModal = (mode) => dispatch(setTestAction(true, mode));
  const closTestModal = () => dispatch(setTestAction(false, "COMPLETE"));

  console.log(sectionsBySubject, "ARAFAT");

  const bulkRegistration = (sectionId, testId) => {
    SecurePost({
      url: `${apis.TRAINEE}/bulk-registration`,
      data: { sectionId, testId },
    })
      .then((response) => {
        if (response.data.success) {
          messageApi.success(response.data.message);
        } else messageApi.warning(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const getActions = (key) => (
    <>
      {/* <Button
        {...editButtonStruct}
        icon={<EditOutlined />}
        onClick={() => openModal(key, "UPDATE")}
      />
      <Divider type="vertical" />
      <Popconfirm {...popconfirmStruct} onConfirm={() => deleteSection(key)}>
        <Button {...deleteButtonStruct} icon={<DeleteOutlined />} />
      </Popconfirm> */}
      {sectionsBySubject.map((section) => {
        return (
          <Flex gap="middle" wrap="wrap">
            <Text>
              Send test link to all students ({section.studentIds.length}) of
              {section.subjectId.topic} ~ {section.name} of
              {section.semesterId.name} ~ {section.semesterId.year}
            </Text>
            <Button
              type="primary"
              onClick={() => bulkRegistration(section._id, key)}
            >
              Send
            </Button>
          </Flex>
        );
      })}
    </>
  );

  const columns = [...getStaticColumns(getActions)];

  const fetchTests = () => {
    if (trainerSubjectIds && trainerSubjectIds.length) {
      dispatch(getTests(trainerSubjectIds));
      dispatch(getSectionBySubject(trainerSubjectIds));
    }
  };

  useEffect(() => {
    fetchTests();
  }, [trainerSubjects]);

  return (
    <>
      <Card>
        {contextHolder}

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
                Create Test
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
        <TestForm fetchTests={fetchTests} />
      </Modal>
    </>
  );
};

export default AllTests;
