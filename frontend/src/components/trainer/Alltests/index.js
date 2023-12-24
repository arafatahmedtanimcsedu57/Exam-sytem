import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Table,
  Typography,
  Card,
  Flex,
  Modal,
  Button,
  Space,
  Tag,
} from "antd";

import { getTests } from "../../../actions/trainerTest.action";
import { setTestAction } from "../../../actions/trainerTest.action";
import { getSectionBySubject } from "../../../actions/section.action";

import TestForm from "../../common/TestForm";

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

  const trainerTest = useSelector((state) => state.trainerTest);
  const {
    trainerTests,
    trainerTestModalState,
    trainerTestsLoading,
  } = trainerTest;

  const sections = useSelector((state) => state.section);
  const { sectionsBySubject } = sections;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

  const openTestModal = (mode) => dispatch(setTestAction(true, mode));
  const closTestModal = () => dispatch(setTestAction(false, "COMPLETE"));

  const getActions = (key) => (
    <>

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
