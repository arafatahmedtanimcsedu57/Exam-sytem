import React from "react";
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
  handleStep,
  handleBasicNewTestDetails,
} from "../../../../actions/test.action";

const { Option } = Select;

const BasicTestForm = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const test = useSelector((state) => state.test);

  const handleSubmit = (values) => {
    dispatch(
      handleBasicNewTestDetails({
        testType: values.type,
        testTitle: values.title,
        testDuration: values.duration,
        OrganisationName: values.organisation,
        testSubject: values.subjects,
      })
    );
    dispatch(handleStep(1));
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
        {...testTitleFieldStruct}
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
