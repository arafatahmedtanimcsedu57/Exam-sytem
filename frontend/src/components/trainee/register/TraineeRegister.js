import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  registrationSection,
  formStruct,
  nameFieldStruct,
  emailFieldStruct,
  contactFieldStruct,
  prefixFieldStruct,
  buttonSectionStruct,
  locationFieldStruct,
  organisationFieldStruct,
  buttonStruct,
} from "./struct";

const { Option } = Select;

const TraineeRegister = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get("testid"));

  const [inform, setInform] = useState(true);
  const [testid, setTestId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => setTestId(localTestId), []);

  const handleSubmit = (values) => {
    Post({
      url: apis.REGISTER_TRAINEE_FOR_TEST,
      data: {
        name: values.name,
        emailId: values.email,
        contact: `${values.prefix}${values.contact}`,
        organisation: values.organisation,
        testid: testid,
        location: values.location,
      },
    })
      .then((data) => {
        if (data.data.success) {
          console.log(data.data.user, "RESPOSE");
          setInform(false);
          setUser(data.data.user);
        } else messageApi.error(data.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  console.log(user, "USER");
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
    <Form.Item {...prefixFieldStruct} initialValue={"+880"}>
      <Select style={{ width: 100 }}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Flex {...registrationSection}>
      {inform ? (
        <Card>
          {contextHolder}
          <Form {...formStruct} onFinish={handleSubmit}>
            <Form.Item {...nameFieldStruct}>
              <Input />
            </Form.Item>

            <Form.Item {...emailFieldStruct}>
              <Input />
            </Form.Item>
            <Form.Item {...contactFieldStruct}>
              <Input addonBefore={PrefixSelector} min={10} max={10} />
            </Form.Item>
            <Form.Item {...organisationFieldStruct}>
              <Input />
            </Form.Item>

            <Form.Item {...locationFieldStruct}>
              <Input placeholder="Location" size="large" />
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

export default TraineeRegister;
