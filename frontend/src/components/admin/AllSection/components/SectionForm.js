import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, message, Typography, Upload } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  setSectionModifyAction,
  getSection,
  getSections,
} from "../../../../actions/section.action";
import { getSubjects } from "../../../../actions/subject.action";
import { getTrainers } from "../../../../actions/trainer.action";
import { getSemesters } from "../../../../actions/semester.action";

import {
  newSectionFormStruct,
  nameFieldStruct,
  subjectFieldStruct,
  trainerFieldStruct,
  semesterFieldStruct,
  studentFieldStruct,
  studentFileUploadStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

const SectionForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const section = useSelector((state) => state.section);
  const { sectionId, sectionModalMode, sectionDetails } = section;

  const subject = useSelector((state) => state.subject);
  const { subjects } = subject;

  const trainer = useSelector((state) => state.trainer);
  const { trainers } = trainer;

  const semester = useSelector((state) => state.semester);
  const { semesters } = semester;

  const [currentStudents, setCurrentStudents] = useState([]);

  const logFile = (event) => {
    let str = event.target.result;
    let json = JSON.parse(str);

    setCurrentStudents(json);
  };

  const handleFileUpload = (info) => {
    if (info.file.status !== "uploading") {
      setCurrentStudents([]);
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
    SecurePost({
      url: `${apis.SECTION}`,
      data: {
        _id: sectionId,
        name: values.name,
        subjectId: values.subjectId,
        semesterId: values.semesterId,
        trainerId: values.trainerId,
        students: currentStudents,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getSections());
          dispatch(setSectionModifyAction(null, false, "COMPLETE"));
          messageApi.success(response.data.message);
        } else {
          dispatch(setSectionModifyAction(null, false, "COMPLETE"));
          messageApi.warning(response.data.message);
        }
      })
      .catch(() => {
        dispatch(setSectionModifyAction(null, false, "COMPLETE"));
        return messageApi.error("Server Error");
      });
  };

  useEffect(() => {
    if (sectionId) {
      dispatch(getSection(sectionId));
    }

    dispatch(getSubjects());
    dispatch(getTrainers());
    dispatch(getSemesters());
  }, [sectionId]);

  useEffect(() => form.resetFields(), [form, sectionDetails]);

  return (
    <>
      {contextHolder}
      <Form
        {...newSectionFormStruct}
        form={form}
        onFinish={handleSubmit}
        initialValues={{ ...sectionDetails }}
      >
        <Form.Item {...subjectFieldStruct.subjectField}>
          <Select {...subjectFieldStruct.select}>
            {subjects.map((subject) => (
              <Option key={subject._id} s={subject.topic} value={subject._id}>
                {subject.topic}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...nameFieldStruct}>
          <Input />
        </Form.Item>

        <Form.Item {...semesterFieldStruct.semesterField}>
          <Select {...semesterFieldStruct.selectStruct.select}>
            {semesters.map((semester) => (
              <Option key={semester._id} s={semester.name} value={semester._id}>
                <div>
                  <Text>{semester.year}</Text> ~{" "}
                  <Text {...semesterFieldStruct.selectStruct.text}>
                    {semester.name}
                  </Text>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...trainerFieldStruct.trainerField}>
          <Select {...trainerFieldStruct.selectStruct.select}>
            {trainers.map((trainer) => (
              <Option key={trainer._id} s={trainer.name} value={trainer._id}>
                <div>
                  <Text>{trainer.name.trim().split(" ")[0]}</Text> ~
                  <Text {...trainerFieldStruct.selectStruct.text}>
                    {trainer.emailId}
                  </Text>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...studentFieldStruct}>
          <Dragger {...studentFileUploadStruct} onChange={handleFileUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag an JSON file to this area to upload
            </p>
            <p className="ant-upload-hint">Support for a single upload.</p>
          </Dragger>
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{sectionModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SectionForm;
