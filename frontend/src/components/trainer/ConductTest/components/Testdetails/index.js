import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Typography } from "antd";

import { getTest } from "../../../../../actions/trainerTest.action";

import CandidateResults from "./../Result";

import { SecurePost } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

import { getStaticColumns, tableStruct } from "./struct";

const { Title, Text } = Typography;

const TestDetails = ({ testId }) => {
  const [currentTest, setCurrentTest] = useState(null);
  const [currentTestDetails, setCurrentTestDetails] = useState(null);

  const dispatch = useDispatch();

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails, trainerTestLoading } = trainerTest;

  const closeModal = () => {
    setCurrentTest(null);
    setCurrentTestDetails(null);
  };

  const publishResult = (testId) =>
    SecurePost({
      url: `${apis.PUBLISH_RESULTS}`,
      data: { testId },
    }).then((response) => {
      if (response.data.success) {
        setCurrentTest(testId);
        dispatch(getTest(testId));
      }
    });

  const getActions = (key, test) => {
    return test && test.testConducted ? (
      test.isResultGenerated ? (
        <Button onClick={() => setCurrentTest(key)}>Result</Button>
      ) : (
        <Button onClick={() => publishResult(key)}>Publish Result</Button>
      )
    ) : (
      <></>
    );
  };
  const columns = [...getStaticColumns(getActions)];

  useEffect(() => {
    dispatch(getTest(testId));
  }, []);

  console.log(trainerTestDetails, currentTest, "ARAFAT AHMED");

  return (
    trainerTestDetails && (
      <>
        {" "}
        <Table
          {...tableStruct}
          columns={columns}
          dataSource={[{ ...trainerTestDetails }]}
          loading={trainerTestLoading}
        />
        <Modal
          open={currentTest}
          title={
            trainerTestDetails ? (
              <div>
                <Title level={5}>{trainerTestDetails.title}</Title>
                <Text type="secondary"> ~ {trainerTestDetails.type}</Text>
              </div>
            ) : (
              <></>
            )
          }
          onCancel={closeModal}
          destroyOnClose={true}
          footer={[]}
        >
          <CandidateResults
            testId={trainerTestDetails._id}
            setCurrentTestDetails={setCurrentTestDetails}
          />
        </Modal>
      </>
    )
  );
};

export default TestDetails;
