import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, message } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  ChangeSubjectTableData,
  ChangeSubjectModalState,
} from "../../../../actions/adminAction";

import {
  newTopicsFormStruct,
  topicFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

const TopicForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.CREATE_SUBJECT}`,
      data: {
        _id: admin.SubjectId,
        topic: values.topic,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(ChangeSubjectTableData());
          dispatch(ChangeSubjectModalState(false, null, "New Topic"));
          messageApi.success(response.data.message);
        } else {
          dispatch(ChangeSubjectModalState(false, null, "New Topic"));
          messageApi.warning(response.data.message);
        }
      })
      .catch((error) => {
        dispatch(ChangeSubjectModalState(false, null, "New Topic"));
        messageApi.error("Server Error");
      });
  };

  return (
    <>
      {contextHolder}
      <Form {...newTopicsFormStruct} onFinish={handleSubmit}>
        <Form.Item
          {...topicFieldStruct}
          initialValue={admin.subjectDetails.topic}
        >
          <Input />
        </Form.Item>
        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{admin.Subjectmode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TopicForm;
