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
  numberOFQuestionsFieldStruct,
  tagFieldStruct,
} from "./struct";

import quizzTypes from "./const";

const { Option } = Select;

const TestForm = ({ selectedQuestions, fetchTests }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const tag = useSelector((state) => state.tag);
  const { tags } = tag;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestModalMode } = trainerTest;

  const trainerSubject = useSelector((state) => state.trainerSubject);
  const { trainerSubjects } = trainerSubject;
  const subjects = trainerSubjects.map((subject) => subject.subjectId);

  const handleSubmit = (values) => {
    if (trainerTestModalMode === "START AUTO GENERATION") {
      console.log(values, "VALUES");

      SecurePost({
        url: `${apis.TEST}/create-with-auto-generated-questions`,
        data: { ...values },
      })
        .then((response) => {
          if (response.data.success) {
            fetchTests && fetchTests();
            dispatch(setTestAction(false, "COMPLETE"));
            messageApi.success(response.data.message);
          } else messageApi.warning(response.data.message);
        })
        .catch(() => messageApi.error("Server Error"));
    } else {
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
    }
  };

  return (
    <>
      {contextHolder}
      <Form {...testFormStruct} onFinish={handleSubmit}>
        {!!selectedQuestions && (
          <>
            <Alert
              message={`${selectedQuestions.length} questions are selected`}
            />

            <Divider />
          </>
        )}

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

        {subjects && (
          <Form.Item {...subjectFieldStruct.subjectField}>
            <Select {...subjectFieldStruct.select}>
              {subjects.map((subject) => (
                <Option key={subject._id} s={subject.topic} value={subject._id}>
                  {subject.topic}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {trainerTestModalMode === "START AUTO GENERATION" && (
          <Form.Item {...tagFieldStruct.tagField}>
            <Select {...tagFieldStruct.select}>
              {tags.map((tag) => (
                <Option key={tag.value} s={tag.label} value={tag._id}>
                  {tag.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

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

        {trainerTestModalMode === "START AUTO GENERATION" && (
          <Form.Item {...numberOFQuestionsFieldStruct}>
            <Input />
          </Form.Item>
        )}

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{trainerTestModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TestForm;
