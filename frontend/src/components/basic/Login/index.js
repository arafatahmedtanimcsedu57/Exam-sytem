import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../actions/loginAction";

import { Button, Card, Form, Input, message } from "antd";
import {
  loginFormStruct,
  emailFieldStruct,
  buttonSectionStruct,
  passwordFieldStruct,
  buttonStruct,
} from "./struct";

import auth from "../../../services/AuthServices";

const Login = () => {
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
    </>
  );
};

export default Login;
