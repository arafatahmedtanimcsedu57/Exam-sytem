import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Select, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import { setQuestionUploadAction } from "../../../../actions/question.action";
import { getSubjects } from "../../../../actions/subject.action";

import {
  newQuestionFormStruct,
  subjectFieldStruct,
  buttonSectionStruct,
  buttonStruct,
  questionsFieldStruct,
  questionsFileUploadStruct,
} from "./struct";

const { Option } = Select;
const { Dragger } = Upload;

const UploadNewQuestions = ({ fetchQuestions }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const question = useSelector((state) => state.question);
  const { questionUploadModalMode } = question;

  const subject = useSelector((state) => state.subject);
  const { subjects } = subject;

  const [currentQuestions, setCurrentQuestions] = useState([]);

  const logFile = (event) => {
    let str = event.target.result;
    let json = JSON.parse(str);

    setCurrentQuestions(json);
  };

  const handleFileUpload = (info) => {
    if (info.file.status !== "uploading") {
      setCurrentQuestions([]);
      let reader = new FileReader();
      reader.onload = logFile;

      reader.readAsText(info.file.originFileObj);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = (values) => {
    console.log({
      questions: currentQuestions,
      subject: values.subject,
    });
    SecurePost({
      url: `${apis.QUESTION}/bulk`,
      data: {
        questions: currentQuestions,
        subject: values.subject,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(setQuestionUploadAction(false, "COMPLETE"));
          fetchQuestions();
          messageApi.success(response.data.message);
        } else messageApi.warning(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  useEffect(() => {
    dispatch(getSubjects());
  }, []);

  useEffect(() => form.resetFields(), []);

  return (
    <>
      {contextHolder}
      <Form {...newQuestionFormStruct} onFinish={handleSubmit}>
        <Form.Item {...subjectFieldStruct}>
          <Select
            showSearch
            placeholder="Select a subject"
            optionFilterProp="s"
          >
            {subjects.map((subject) => (
              <Option key={subject._id} s={subject.topic} value={subject._id}>
                {subject.topic}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={questionsFieldStruct.label}>
          <Form.Item {...questionsFieldStruct}>
            <Dragger {...questionsFileUploadStruct} onChange={handleFileUpload}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag na CSV file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{questionUploadModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadNewQuestions;
