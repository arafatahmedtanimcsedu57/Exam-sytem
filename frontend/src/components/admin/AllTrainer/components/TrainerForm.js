import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Select, message } from "antd";

import { SecurePost } from "../../../../services/axiosCall";
import apis from "../../../../services/Apis";

import {
  handleTrainerModalState,
  handleTrainerTableData,
} from "../../../../actions/admin.action";

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

const { Option } = Select;

const TrainerForm = () => {
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
        emailId: values.emailId,
        contact: values.prefix + values.contact,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTrainerTableData());
          dispatch(handleTrainerModalState(false, null, "COMPLETE"));
          messageApi.success(response.data.message);
        } else {
          dispatch(handleTrainerModalState(false, null, "COMPLETE"));
          messageApi.warning(response.data.message);
        }
      })
      .catch(() => {
        dispatch(handleTrainerModalState(false, null, "COMPLETE"));
        return messageApi.error("Server Error");
      });
  };

  const PrefixSelector = (
    <Form.Item
      {...prefixFieldStruct}
      initialValue={admin.trainerDetails.prefix || "+880"}
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
          initialValue={admin.trainerDetails.name}
        >
          <Input />
        </Form.Item>

        {!admin.trainerId ? (
          <Form.Item
            {...emailFieldStruct}
            initialValue={admin.trainerDetails.emailId}
          >
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item
          {...contactFieldStruct}
          initialValue={admin.trainerDetails.contact}
        >
          <Input addonBefore={PrefixSelector} min={10} max={10} />
        </Form.Item>

        {!admin.trainerId ? (
          <>
            <Form.Item
              {...passwordFieldStruct}
              initialValue={admin.trainerDetails.password}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...confirmPasswordFieldStruct}>
              <Input.Password />
            </Form.Item>
          </>
        ) : null}
        <Form.Item {...buttonSectionStruct}>
          <Button {...buttonStruct}>{admin.trainerMode}</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TrainerForm;
