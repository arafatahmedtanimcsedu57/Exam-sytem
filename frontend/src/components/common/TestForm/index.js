import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  InputNumber,
  Input,
  Button,
  Select,
  Tooltip,
  Typography,
  Space,
  Alert,
  Divider,
} from "antd";

import {
  testFormStruct,
  testTypeFieldStruct,
  testTitleFieldStruct,
  subjectFieldStruct,
  testDurationFieldStruct,
  organisationFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

import quizzTypes from "./const";

const { Option } = Select;

const TestForm = ({ selectedQuestions }) => {
  console.log(selectedQuestions);
  const dispatch = useDispatch();

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestModalMode } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;
  const subjects = trainerSubjects.map((subject) => subject.subjectId);

  const handleSubmit = (values) => {
    console.log({ ...values, questions: selectedQuestions });
  };

  return (
    <Form {...testFormStruct} onFinish={handleSubmit}>
      <Alert message={`${selectedQuestions.length} questions are selected`} />

      <Divider />

      <Form.Item {...testTypeFieldStruct.testTypeField}>
        <Select {...testTypeFieldStruct.select}>
          {quizzTypes.map((quizzType) => {
            return <Option value={quizzType.value}>{quizzType.label}</Option>;
          })}
        </Select>
      </Form.Item>

      <Form.Item {...testTitleFieldStruct}>
        <Input />
      </Form.Item>

      <Form.Item {...subjectFieldStruct.subjectField}>
        <Select {...subjectFieldStruct.select}>
          {subjects.map((subject) => (
            <Option key={subject._id} s={subject.topic} value={subject._id}>
              {subject.topic}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...testDurationFieldStruct}>
        <Space>
          <InputNumber min={1} max={180} />
          <Tooltip title="Useful information">
            <Typography.Text>Minute</Typography.Text>
          </Tooltip>
        </Space>
      </Form.Item>

      <Form.Item {...organisationFieldStruct}>
        <Input />
      </Form.Item>

      <Form.Item {...buttonSectionStruct}>
        <Button {...buttonStruct}>{trainerTestModalMode}</Button>
      </Form.Item>
    </Form>
  );
};

export default TestForm;
