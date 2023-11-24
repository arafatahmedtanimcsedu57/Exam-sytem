import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Modal, Transfer, Flex } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import {
  handleStep,
  fetchSubjectWiseQuestion,
  pushQuestionToQueue,
} from "../../../../actions/test.action";

import QuestionDetails from "../../../common/QuestionDetails";
import { Question } from "../../../common/QuestionDetails/components/Question";

import {
  sectionStruct,
  transferSectionStruct,
  transferQuestionSectionStruct,
  buttonStruct,
} from "./struct";

function SelectQuestion() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModel = (id) => {
    setActiveQuestion(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleChange = (targetKeys, direction, moveKeys) =>
    dispatch(pushQuestionToQueue(targetKeys));

  const renderItem = (item) => {
    const customLabel = (
      <Flex {...transferQuestionSectionStruct}>
        <div>
          <Question details={item} />
        </div>
        <Button
          onClick={() => openModel(item._id)}
          icon={<InfoCircleOutlined />}
        />
      </Flex>
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
      <Modal
        open={isOpen}
        title="Question details"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <QuestionDetails id={activeQuestion} />
      </Modal>
    </>
  );
}

export default SelectQuestion;
