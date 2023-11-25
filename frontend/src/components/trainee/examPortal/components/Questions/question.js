import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import apis from "../../../../../services/Apis";
import { Post } from "../../../../../services/axiosCall";
import {
  Button,
  Flex,
  Card,
  Checkbox,
  message,
  Typography,
  Tag,
  Badge,
  Space,
} from "antd";
import {
  switchQuestion,
  updateIsMarked,
  fetchTestdata,
} from "../../../../../actions/traineeAction";

const { Text, Title } = Typography;

const SingleQuestion = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const trainee = useSelector((state) => state.trainee);

  const [examState, setExamState] = useState({
    answerSelected:
      trainee.answers[trainee.activeQuestionIndex].chosenOption.length ===
      Number(trainee.questions[trainee.activeQuestionIndex].anscount)
        ? true
        : false,
    options: trainee.questions[trainee.activeQuestionIndex].options,
    answers: trainee.answers[trainee.activeQuestionIndex].chosenOption,
    ticked: 0,
  });

  useState(() => {
    setExamState((prev) => {
      let _ticked = 0;
      var _options = prev.options.map((option, i) => {
        for (var ii = 0; ii < prev.answers.length; ii++) {
          if (prev.answers[ii] === option._id) {
            _ticked += 1;
            return {
              ...option,
              checked: true,
            };
          }
        }
        return {
          ...option,
          checked: false,
        };
      });
      return {
        ...prev,
        ticked: _ticked,
        options: _options,
      };
    });
  }, []);

  const saveToCloud = () => {
    Post({
      url: `${apis.UPDATE_ANSWERS}`,
      data: {
        testid: trainee.testid,
        userid: trainee.traineeid,
        qid: trainee.questions[trainee.activeQuestionIndex]._id,
        newAnswer: examState.answers,
      },
    })
      .then((response) => {
        if (response.data.success) {
          var t = [...trainee.answers];
          t[trainee.activeQuestionIndex] = {
            ...t[trainee.activeQuestionIndex],
            chosenOption: examState.answers,
            isAnswered: true,
          };
          dispatch(updateIsMarked(t));
        } else {
          dispatch(fetchTestdata(trainee.testid, trainee.traineeid));
          return messageApi.error(response.data.message);
        }
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const previous = () => {
    if (trainee.activeQuestionIndex > 0)
      dispatch(switchQuestion(trainee.activeQuestionIndex - 1));
  };

  const next = () => {
    if (examState.answerSelected) {
      saveToCloud();
      if (trainee.activeQuestionIndex < trainee.questions.length - 1)
        dispatch(switchQuestion(trainee.activeQuestionIndex + 1));
    } else {
      if (trainee.activeQuestionIndex < trainee.questions.length - 1)
        dispatch(switchQuestion(trainee.activeQuestionIndex + 1));
    }
  };

  const mark = () => {
    let aa = [...trainee.answers];
    let c = aa[trainee.activeQuestionIndex];
    c.isMarked = !trainee.answers[trainee.activeQuestionIndex].isMarked;
    aa[trainee.activeQuestionIndex] = c;
    dispatch(updateIsMarked(aa));
  };

  const onAnswerChange = (d1, d2, d3) => {
    var ansCount = trainee.questions[trainee.activeQuestionIndex].anscount;
    if (d2) {
      if (examState.ticked === ansCount)
        return messageApi.error(
          "Clear selected options to select other option"
        );
      else {
        var op1 = [...examState.options];
        op1[d1] = {
          ...op1[d1],
          checked: true,
        };

        var op2 = [...examState.answers];
        op2.push(d3);
        if (examState.ticked === ansCount - 1) {
          setExamState((prev) => ({
            answerSelected: true,
            ticked: prev.ticked + 1,
            options: op1,
            answers: op2,
          }));
        } else {
          setExamState((prev) => ({
            ticked: prev.ticked + 1,
            options: op1,
            answers: op2,
          }));
        }
      }
    } else {
      op1 = [...examState.options];
      op1[d1] = {
        ...op1[d1],
        checked: false,
      };

      op2 = [...examState.answers];
      var index = op2.indexOf(d3);

      op2.splice(index, 1);
      setExamState((prev) => ({
        answerSelected: false,
        ticked: prev.ticked - 1,
        options: op1,
        answers: op2,
      }));
    }
  };

  let opts = ["A", "B", "C", "D", "E"];

  return (
    <>
      {contextHolder}
      <Badge.Ribbon
        text={`Marks ${
          trainee.questions[trainee.activeQuestionIndex].weightage
        }`}
      >
        <Card>
          <Flex vertical gap="middle">
            <Space>
              <Tag>{trainee.activeQuestionIndex + 1}</Tag>
              <Title level={5}>
                {trainee.questions[trainee.activeQuestionIndex].body}
              </Title>
            </Space>

            {examState.options.map((d, i) => {
              return (
                <Flex>
                  <Space>
                    <Tag>{opts[i]}</Tag>
                    <Text>{d.optbody}</Text>
                    <Checkbox
                      checked={d.checked}
                      onChange={(e) =>
                        onAnswerChange(i, e.target.checked, d._id)
                      }
                    />
                  </Space>
                </Flex>
              );
            })}
            <Space>
              <Button.Group>
                {trainee.activeQuestionIndex === 0 ? null : (
                  <Button onClick={() => previous()}>Previous</Button>
                )}

                <Button onClick={() => mark()}>
                  {!trainee.answers[trainee.activeQuestionIndex].isMarked
                    ? "Mark Question"
                    : "Unmark Question"}
                </Button>

                {trainee.activeQuestionIndex ===
                trainee.questions.length - 1 ? null : (
                  <Button onClick={() => next()}>
                    {examState.answerSelected ? "Save & Next" : "Next"}
                  </Button>
                )}
                {trainee.activeQuestionIndex === trainee.questions.length - 1 &&
                examState.answerSelected ? (
                  <Button onClick={() => saveToCloud()}>Save</Button>
                ) : null}
              </Button.Group>
            </Space>
          </Flex>
        </Card>
      </Badge.Ribbon>
    </>
  );
};

export default SingleQuestion;
