import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Transfer, Flex } from "antd";

import {
  handleStep,
  fetchSubjectWiseQuestion,
  pushQuestionToQueue,
} from "../../../../actions/test.action";

import { QuestionDetails } from "../../../common/QuestionDetails";

import {
  sectionStruct,
  transferSectionStruct,
  transferQuestionSectionStruct,
  buttonStruct,
} from "./struct";

function SelectQuestion() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  const handleChange = (targetKeys, direction, moveKeys) =>
    dispatch(pushQuestionToQueue(targetKeys));

  const renderItem = (item) => {
    const customLabel = (
      <div {...transferQuestionSectionStruct}>
        <QuestionDetails details={item} />
      </div>
    );
    return {
      label: customLabel,
      value: item._id,
    };
  };

  useEffect(() => {
    dispatch(fetchSubjectWiseQuestion(test.newtestFormData.testSubject));
  }, []);

  return (
    <>
      <Flex {...sectionStruct}>
        <Transfer
          rowKey={(record) => record._id}
          dataSource={test.questionsAvailablebasedonSubject}
          targetKeys={test.newtestFormData.testQuestions}
          render={renderItem}
          onChange={handleChange}
          {...transferSectionStruct}
        />

        <Button {...buttonStruct} onClick={() => dispatch(handleStep(2))}>
          Next
        </Button>
      </Flex>
    </>
  );
}

export default SelectQuestion;
