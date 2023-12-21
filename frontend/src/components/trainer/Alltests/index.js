import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import CandidateResults from "./components/Result";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import { headingStruct, getStaticColumns, tableStruct } from "./struct";

const { Title, Text } = Typography;

const AllTests = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTests, trainerTestsLoading } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;

  const subjects = trainerSubjects.map((subject) => subject.subjectId);
  const trainerSubjectIds = subjects.map((subject) => subject._id);

  const columns = [...getStaticColumns()];

  const fetchTests = () => {
    trainerSubjectIds &&
      trainerSubjectIds.length &&
      dispatch(getTests(trainerSubjectIds));
  };

  useEffect(() => fetchTests(), [trainerSubjects]);

  console.log("TESTS", trainerTests);

  return (
    <>
      <Card>
        <Flex {...headingStruct}>
          <Flex {...headingStruct.heading}>
            <Space>
              <Title {...headingStruct.title}>Tests</Title>
              <div>
                {trainerTests && trainerTests.length && (
                  <Tag {...headingStruct.tag}>{trainerTests.length}</Tag>
                )}
              </div>
            </Space>
          </Flex>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainerTests}
          loading={trainerTestsLoading}
        />
      </Card>
    </>
  );
};

export default AllTests;
