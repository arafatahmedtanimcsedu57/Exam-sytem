import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Badge, Button, Flex } from "antd";

import { switchQuestion } from "../../../../../actions/traineeAction";

import { operationsSectionStruct } from "./struct";

const Mark = (props) => {
  const dispatch = useDispatch();

  console.log(props, "BALSAL");
  return (
    <Badge dot={props.mark}>
      <Button
        type={props.ans ? "primary" : "default"}
        onClick={() => dispatch(switchQuestion(props.no))}
      >
        {props.no + 1}
      </Button>
    </Badge>
  );
};

const Operations = () => {
  const trainee = useSelector((state) => state.trainee);

  return (
    <Flex {...operationsSectionStruct}>
      {trainee.answers.map((answer, i) => {
        return (
          <Mark
            questionId={answer.questionId}
            ans={answer.isAnswered}
            mark={answer.isMarked}
            no={i}
          />
        );
      })}
    </Flex>
  );
};

export default Operations;
