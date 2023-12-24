import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Card, Typography, Alert, List } from "antd";

import { getAnsweerSheet } from "../../../../../../../actions/trainee.action";

import { alertStruct, processButtonStruct } from "./struct";

const { Title } = Typography;

const Instruction = ({ testId, traineeId }) => {
  const dispatch = useDispatch();
  const trainee = useSelector((state) => state.trainee);
  const {
    examState: { data },
  } = trainee;

  const fetchAnsweerSheet = () => dispatch(getAnsweerSheet(testId, traineeId));

  return !data || !data.startTime ? (
    <Card>
      <Title level={2}>General Instructions:</Title>
      <br />
      <List>
        <List.Item>
          <List.Item.Meta description="All questions are compulsory." />
        </List.Item>

        <List.Item>
          <List.Item.Meta description="You can bookmark any question." />
        </List.Item>

        <List.Item>
          <List.Item.Meta description="Answers can be updated anytime before the time limit." />
        </List.Item>

        <List.Item>
          <List.Item.Meta description="This test is time bound,there's a timer on the right panel." />
        </List.Item>

        <List.Item>
          <List.Item.Meta description="Click on 'End Test' button to submit test before time limit." />
        </List.Item>

        <List.Item>
          <List.Item.Meta description="The test will be automatically submitted when the clock reads 0:0." />
        </List.Item>
      </List>

      <br />
      <Alert {...alertStruct} />
      <br />

      <Button {...processButtonStruct} onClick={() => fetchAnsweerSheet()}>
        Proceed To Test
      </Button>
    </Card>
  ) : (
    <></>
  );
};

export default Instruction;
