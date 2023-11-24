import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Card,
  Form,
  Input,
  Flex,
  Image,
  message,
  Typography,
} from "antd";

import auth from "../../../services/auth.services";

import { login } from "../../../actions/login.action";

import {
  loginFormStruct,
  emailFieldStruct,
  buttonSectionStruct,
  passwordFieldStruct,
  buttonStruct,
  loginSectionStruct,
  loginBannerStruct,
  homeSectionTitle,
} from "./struct";

import BannerImg from "./../images/banner.png";

const { Title } = Typography;

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (values) => {
    auth
      .LoginAuth(values.email, values.password)
      .then((response) => {
        if (response.data.success) {
          dispatch(login(response.data.user));
          auth.storeToken(response.data.token);
          setIsLoggedIn(true);
        } else return messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };

  if (isLoggedIn) return <Navigate to={user.userOptions[0].link} />;
  return (
    <>
      {contextHolder}
      <Flex {...loginSectionStruct}>
        <Image {...loginBannerStruct} src={BannerImg} />
        <div>
          <Title {...homeSectionTitle} level={1} color="primary">
            An Education <br></br>Product Like <br></br> No Other
          </Title>
          <Card>
            <Form {...loginFormStruct} onFinish={handleSubmit}>
              <Form.Item {...emailFieldStruct}>
                <Input />
              </Form.Item>
              <Form.Item {...passwordFieldStruct}>
                <Input.Password />
              </Form.Item>
              <Form.Item {...buttonSectionStruct}>
                <Button {...buttonStruct}>Login</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Flex>
    </>
  );
};
