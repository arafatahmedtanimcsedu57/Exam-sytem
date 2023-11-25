import React from "react";
import moment from "moment";

import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Flex, Typography, Divider, Space } from "antd";

import { userInfoSectionStruct, metaSectionStruct } from "./struct";

const { Text, Title } = Typography;

export const UserProfile = (props) => {
  const user = props.details;
  const showMeta = !(props.showMeta === null || undefined)
    ? props.showMeta
    : true;
  const extra = props.extra ? props.extra : null;

  return (
    <Flex {...userInfoSectionStruct}>
      <Title level={5}>{user.name}</Title>
      <Space><MailOutlined /><Text>{user.emailid}</Text></Space>
      <Space><PhoneOutlined /><Text>{user.contact}</Text></Space>

      {showMeta ? (
        <Flex {...metaSectionStruct}>
          <Text type="secondary">
            {moment(user.createdAt).format("DD/MM/YYYY")}
          </Text>
          {extra && (
            <>
              <Divider type="vertical" />

              {extra}
            </>
          )}
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
};
