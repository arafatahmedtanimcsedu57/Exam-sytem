import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, message } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  getSubject,
  getSubjects,
  setSubjectModifyAction,
} from "../../../../actions/subject.action";

import {
  newTopicsFormStruct,
  topicFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

const TopicForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const subject = useSelector((state) => state.subject);
  const { subjectId, subjectModalMode, subjectDetails } = subject;

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.SUBJECT}`,
      data: {
        _id: subjectId,
        topic: values.topic,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getSubjects());
          dispatch(setSubjectModifyAction(null, false, "COMPLETE"));
          messageApi.success(response.data.message);
        } else {
          dispatch(setSubjectModifyAction(null, false, "COMPLETE"));
          messageApi.warning(response.data.message);
        }
      })
      .catch(() => {
        dispatch(setSubjectModifyAction(null, false, "COMPLETE"));
        messageApi.error("Server Error");
      });
  };

  useEffect(() => {
    if (subjectId) {
      dispatch(getSubject(subjectId));
    }
  }, [subjectId]);

  useEffect(() => form.resetFields(), [form, subjectDetails]);

  console.log(subjectDetails, "SUBJECT");
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        {...newTopicsFormStruct}
        onFinish={handleSubmit}
        initialValues={{ ...subjectDetails }}
      >
        <Form.Item {...topicFieldStruct}>
          <Input />
        </Form.Item>
        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{subjectModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TopicForm;
