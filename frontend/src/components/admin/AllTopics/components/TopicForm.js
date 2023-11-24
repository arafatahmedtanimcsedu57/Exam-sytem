import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, message } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  handleSubjectTableData,
  handleSubjectModalState,
} from "../../../../actions/admin.action";

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
        _id: admin.subjectId,
        topic: values.topic,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleSubjectTableData());
          dispatch(handleSubjectModalState(false, null, "COMPLETE"));
          messageApi.success(response.data.message);
        } else {
          dispatch(handleSubjectModalState(false, null, "COMPLETE"));
          messageApi.warning(response.data.message);
        }
      })
      .catch((error) => {
        dispatch(handleSubjectModalState(false, null, "COMPLETE"));
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
          <Button {...buttonStruct}>{admin.subjectMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TopicForm;
