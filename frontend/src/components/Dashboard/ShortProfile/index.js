import React from "react";
import { useSelector } from "react-redux";

import { Card, Typography, Flex, Badge } from "antd";

import {
  profileStruct,
  profileSectionStruct,
  textStruct,
  badgeStruct,
} from "./struct";

const { Text, Title } = Typography;

const ShortProfile = () => {
  const user = useSelector((state) => state.user);

  return user.userDetails.name ? (
    <Badge.Ribbon text={user.userDetails.type} {...badgeStruct}>
      <Card {...profileStruct}>
        <Flex {...profileSectionStruct}>
          <Title {...textStruct.title}>
            {user.userDetails.name.toUpperCase()}
          </Title>
          <Text {...textStruct.text}>{user.userDetails.emailId}</Text>
          <Text {...textStruct.text}>{user.userDetails.contact}</Text>
        </Flex>
      </Card>
    </Badge.Ribbon>
  ) : (
    <></>
  );
};

export default ShortProfile;
