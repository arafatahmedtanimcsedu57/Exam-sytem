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
    <Flex {...userInfoSectionStruct.userInfo}>
      <Title {...userInfoSectionStruct.title}>{user.name}</Title>
      <Space>
        <MailOutlined />
        <Text {...userInfoSectionStruct.textEmail}>{user.emailId}</Text>
      </Space>
      <Space>
        <PhoneOutlined />
        <Text {...userInfoSectionStruct.textContact}>{user.contact}</Text>
      </Space>

      {showMeta ? (
        <Flex {...metaSectionStruct.metaSection}>
          <Text {...metaSectionStruct.text}>
            {moment(user.createdAt).format("DD/MM/YYYY")}
          </Text>
          {extra && (
            <>
              <Divider {...metaSectionStruct.divider} />

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
