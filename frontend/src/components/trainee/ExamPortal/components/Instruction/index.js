import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Card, Typography, Alert, Flex } from "antd";

import { fetchAnsweerSheet } from "../../../../../actions/trainee.action";

import { instractionSectionStruct, processButtonStruct } from "./struct";

const { Title } = Typography;

const Instruction = ({ testId, traineeId }) => {
  const dispatch = useDispatch();
  const trainee = useSelector((state) => state.trainee);
  const {
    examState: { loading, data, error },
  } = trainee;

  const getAnsweerSheet = () => dispatch(fetchAnsweerSheet(testId, traineeId));

  return !data || !data.startTime ? (
    <Flex {...instractionSectionStruct}>
      <Card>
        <Title level={2}>General Instructions:</Title>
        <ul>
          <li> All questions are compulsory.</li>
          <li> You can bookmark any question.</li>
          <li> Answers can be updated anytime before the time limit.</li>
          <li> This test is time bound,there's a timer on the right panel.</li>
          <li>
            {" "}
            Click on 'End Test' button to submit test before time limit.{" "}
          </li>
          <li>
            {" "}
            The test will be automatically submitted when the clock reads 0:0.
          </li>
        </ul>

        <Alert
          showIcon
          type="warning"
          message="To save answers,click on the 'Save & Next' button."
        />

        <br />

        <Button {...processButtonStruct} onClick={() => getAnsweerSheet()}>
          Proceed To Test
        </Button>
      </Card>
    </Flex>
  ) : (
    <></>
  );
};

export default Instruction;
