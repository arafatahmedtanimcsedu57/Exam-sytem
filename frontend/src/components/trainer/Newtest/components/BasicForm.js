import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, InputNumber, Input, Button, Select } from "antd";

import {
  basicFormStruct,
  testTypeFieldStruct,
  testTitleFieldStruct,
  subjectFieldStruct,
  testDurationFieldStruct,
  organisationFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

import {
  changeStep,
  changeBasicNewTestDetails,
} from "../../../../actions/testAction";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

const { Option } = Select;

const BasicTestForm = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const test = useSelector((state) => state.test);

  const [checkingName, setCheckingName] = useState("");

  const handleSubmit = (values) => {
    dispatch(
      changeBasicNewTestDetails({
        testType: values.type,
        testTitle: values.title,
        testDuration: values.duration,
        OrganisationName: values.organisation,
        testSubject: values.subjects,
      })
    );
    dispatch(changeStep(1));
  };

  const validateTestName = (rule, value, callback) => {
    if (value.length >= 5) {
      setCheckingName("validating");
      SecurePost({
        url: apis.CHECK_TEST_NAME,
        data: {
          testname: value,
        },
      })
        .then((data) => {
          if (data.data.success) {
            if (data.data.can_use) {
              setCheckingName("success");
              callback();
            } else {
              setCheckingName("error");
              callback("Another test exist with same name.");
            }
          } else {
            setCheckingName("success");
            callback();
          }
        })
        .catch(() => {
          setCheckingName("success");
          callback();
        });
    } else {
      callback();
    }
  };

  return (
    <Form {...basicFormStruct} onFinish={handleSubmit}>
      <Form.Item
        {...testTypeFieldStruct}
        initialValue={test.newtestFormData.testType}
      >
        <Select placeholder="Select a test type">
          <Option value="pre-test">Pre Test</Option>
          <Option value="post-test">Post Test</Option>
        </Select>
      </Form.Item>

      <Form.Item
        initialValue={test.newtestFormData.testTitle}
        {
          ...testTitleFieldStruct
          // { validator: validateTestName }
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        initialValue={test.newtestFormData.testSubject}
        {...subjectFieldStruct}
      >
        <Select
          mode="multiple"
          placeholder="Select one or more subjects"
          allowClear={true}
          optionFilterProp="s"
        >
          {admin.subjectTableData.map((item) => (
            <Select.Option key={item._id} value={item._id} s={item.topic}>
              {item.topic}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        initialValue={test.newtestFormData.testDuration}
        {...testDurationFieldStruct}
      >
        <InputNumber min={1} max={180} />
      </Form.Item>

      <Form.Item
        initialValue={test.newtestFormData.OrganisationName}
        {...organisationFieldStruct}
      >
        <Input />
      </Form.Item>

      <Form.Item {...buttonSectionStruct}>
        <Button {...buttonStruct}>Next</Button>
      </Form.Item>
    </Form>
  );
};

export default BasicTestForm;
