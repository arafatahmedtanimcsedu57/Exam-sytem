import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Typography, Card, Flex, Modal, Button, Space } from "antd";

import { handleTestTableData } from "../../../actions/trainer.action";

import CandidateResults from "./components/Result";
import { headingStruct, getStaticColumns, tableStruct } from "./struct";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

const { Title, Text } = Typography;

const AllTests = () => {
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);

  const [currentTest, setCurrentTest] = useState(null);
  const [currentTestDetails, setCurrentTestDetails] = useState(null);

  const publishResult = (testId) =>
    SecurePost({
      url: `${apis.PUBLISH_RESULTS}`,
      data: { testId },
    }).then((response) => {
      if (response.data.success) {
        setCurrentTest(testId);
      }
    });

  const getActions = (key) => {
    console.log(key);
    return trainer.testTableData && trainer.testTableData.isResultGenerated ? (
      <Button onClick={() => setCurrentTest(key)}>Result</Button>
    ) : (
      <Button onClick={() => publishResult(key)}>Result</Button>
    );
  };
  const closeModal = () => {
    setCurrentTest(null);
    setCurrentTestDetails(null);
  };

  const columns = [...getStaticColumns(getActions)];

  useEffect(() => dispatch(handleTestTableData()), []);

  return (
    <>
      <Card>
        <Flex {...headingStruct}>
          <Title level={3}>List of Tests</Title>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainer.testTableData}
          loading={trainer.testTableLoading}
        />

        <Modal
          open={currentTest}
          title={
            currentTestDetails ? (
              <div>
                <Title level={5}>{currentTestDetails.title}</Title>
                <Text type="secondary"> ~ {currentTestDetails.type}</Text>
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
            testId={currentTest}
            setCurrentTestDetails={setCurrentTestDetails}
          />
        </Modal>
      </Card>
    </>
  );
};

export default AllTests;
