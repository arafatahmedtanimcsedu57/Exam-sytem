import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select, message } from "antd";
import {
  newTrainerFormStruct,
  nameFieldStruct,
  emailFieldStruct,
  contactFieldStruct,
  passwordFieldStruct,
  confirmPasswordFieldStruct,
  prefixFieldStruct,
  buttonSectionStruct,
  buttonStruct,
} from "./struct";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  ChangeTrainerModalState,
  ChangeTrainerTableData,
} from "../../../actions/adminAction";

const { Option } = Select;

const NewTrainer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleSubmit = (values) => {
    SecurePost({
      url: `${apis.CREATE_TRAINER}`,
      data: {
        _id: admin.trainerId,
        name: values.name,
        password: values.password,
        emailid: values.emailid,
        contact: values.prefix + values.contact,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(ChangeTrainerTableData());
          dispatch(ChangeTrainerModalState(false, null, "Register"));
          messageApi.success(response.data.message);
        } else {
          dispatch(ChangeTrainerModalState(false, null, "Register"));
          messageApi.warning(response.data.message);
        }
      })
      .catch((error) => {
        dispatch(ChangeTrainerModalState(false, null, "Register"));
        return messageApi.error("Server Error");
      });
  };

  const prefixSelector = (
    <Form.Item
      {...prefixFieldStruct}
      initialValue={admin.trainerdetails.prefix || "+880"}
    >
      <Select style={{ width: 100 }}>
        <Option value="+880">+880</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      {contextHolder}
      <Form {...newTrainerFormStruct} onFinish={handleSubmit}>
        <Form.Item
          {...nameFieldStruct}
          initialValue={admin.trainerdetails.name}
        >
          <Input />
        </Form.Item>

        {!admin.trainerId ? (
          <Form.Item
            {...emailFieldStruct}
            initialValue={admin.trainerdetails.emailid}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item
          {...contactFieldStruct}
          initialValue={admin.trainerdetails.contact}
        >
          <Input addonBefore={prefixSelector} min={10} max={10} />
        </Form.Item>

        {!admin.trainerId ? (
          <>
            <Form.Item
              {...passwordFieldStruct}
              initialValue={admin.trainerdetails.password}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...confirmPasswordFieldStruct}>
              <Input.Password />
            </Form.Item>
          </>
        ) : null}
        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{admin.Trainermode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewTrainer;
