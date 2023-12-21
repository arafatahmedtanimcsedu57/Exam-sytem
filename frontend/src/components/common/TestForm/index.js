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
  message,
} from "antd";

import { setTestAction } from "../../../actions/trainerTest.action";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

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
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestModalMode } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;
  const subjects = trainerSubjects.map((subject) => subject.subjectId);

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.TEST}/create`,
      data: { ...values, questions: selectedQuestions },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(setTestAction(false, "COMPLETE"));
          messageApi.success(response.data.message);
        } else messageApi.warning(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default TestForm;
