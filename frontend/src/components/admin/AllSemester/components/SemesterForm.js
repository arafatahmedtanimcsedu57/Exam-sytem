import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, message } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  getSemester,
  getSemesters,
  setSemesterModifyAction,
} from "../../../../actions/semester.action";

import {
  newTopicsFormStruct,
  buttonSectionStruct,
  buttonStruct,
  semesterNameFieldStruct,
  yearFieldStruct,
} from "./struct";

const SemesterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const semester = useSelector((state) => state.semester);
  const { semesterId, semesterModalMode, semesterDetails } = semester;

  console.log(semesterDetails);

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.SEMESTER}`,
      data: {
        _id: semesterId,
        name: values.name,
        year: values.year,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(getSemesters());
          dispatch(setSemesterModifyAction(null, false, "COMPLETE"));
          messageApi.success(response.data.message);
        } else {
          dispatch(setSemesterModifyAction(null, false, "COMPLETE"));
          messageApi.warning(response.data.message);
        }
      })
      .catch(() => {
        dispatch(setSemesterModifyAction(null, false, "COMPLETE"));
        messageApi.error("Server Error");
      });
  };

  useEffect(() => {
    if (semesterId) {
      dispatch(getSemester(semesterId));
    }
  }, [semesterId]);

  useEffect(() => form.resetFields(), [form, semesterDetails]);

  console.log(semesterDetails, "SEMESTER");
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        {...newTopicsFormStruct}
        onFinish={handleSubmit}
        initialValues={{ ...semesterDetails }}
      >
        <Form.Item {...semesterNameFieldStruct}>
          <Input />
        </Form.Item>

        <Form.Item {...yearFieldStruct}>
          <Input />
        </Form.Item>

        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{semesterModalMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SemesterForm;
