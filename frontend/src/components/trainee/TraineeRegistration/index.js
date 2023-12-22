import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Alert as AntAlert,
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Flex,
} from "antd";

import apis from "../../../services/Apis";
import { Post } from "../../../services/axiosCall";

import {
  registrationSectionStruct,
  formStruct,
  nameFieldStruct,
  emailFieldStruct,
  contactFieldStruct,
  buttonSectionStruct,
  locationFieldStruct,
  organisationFieldStruct,
  buttonStruct,
} from "./struct";

const { Option } = Select;

const TraineeRegistration = () => {
  const [messageApi, contextHolder] = message.useMessage();

  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get("testId"));

  const [inform, setInform] = useState(true);
  const [testId, setTestId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => setTestId(localTestId), []);

  const handleSubmit = (values) => {
    Post({
      url: `${apis.TRAINEE}/registration`,
      data: {
        name: values.name,
        emailId: values.email,
        contact: `${values.prefix}${values.contact}`,
        organisation: values.organisation,
        testId: testId,
        location: values.location,
      },
    })
      .then((data) => {
        if (data.data.success) {
          setInform(false);
          setUser(data.data.user);
        } else messageApi.error(data.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const resendMail = () => {
    Post({
      url: apis.RESEND_TRAINER_REGISTRATION_LINK,
      data: {
        id: user._id,
      },
    })
      .then((response) => {
        if (response.data.success)
          messageApi.success("Email has been sent to your email");
        else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  const PrefixSelector = (
    <Form.Item
      {...contactFieldStruct.prefixFieldStruct.prefixField}
      initialValue={"+880"}
    >
      <Select {...contactFieldStruct.prefixFieldStruct.select}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Flex {...registrationSectionStruct.registrationSection}>
      {inform ? (
        <Card {...registrationSectionStruct.registrationFormSection}>
          {contextHolder}
          <Form {...formStruct} onFinish={handleSubmit}>
            <Form.Item {...nameFieldStruct}>
              <Input />
            </Form.Item>

            <Form.Item {...emailFieldStruct}>
              <Input />
            </Form.Item>
            <Form.Item {...contactFieldStruct.contactField}>
              <Input addonBefore={PrefixSelector} min={10} max={10} />
            </Form.Item>
            <Form.Item {...organisationFieldStruct}>
              <Input />
            </Form.Item>

            <Form.Item {...locationFieldStruct}>
              <Input />
            </Form.Item>
            <Form.Item {...buttonSectionStruct}>
              <Button {...buttonStruct}>Register</Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <>
          {user && (
            <>
              <AntAlert
                message={`
              An email containing your test link has been sent to
              ${user.emailId}`}
                type="warning"
                showIcon
              />
              <Button onClick={resendMail}>Resend Mail</Button>
            </>
          )}
        </>
      )}
    </Flex>
  );
};

export default TraineeRegistration;
