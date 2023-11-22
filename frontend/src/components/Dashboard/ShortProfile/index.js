import React from "react";
import { useSelector } from "react-redux";

import { Card, Typography, Tag, Flex } from "antd";

import { profileStruct, profileSectionStruct, textStruct } from "./struct";

const { Text } = Typography;

const ShortProfile = () => {
  const user = useSelector((state) => state.user);

  return user.userDetails.name ? (
    <Card {...profileStruct}>
      <Flex {...profileSectionStruct}>
        <Text {...textStruct.text}>{user.userDetails.name.toUpperCase()}</Text>
        <Tag {...textStruct.tag}>{user.userDetails.type}</Tag>
      </Flex>
    </Card>
  ) : (
    <></>
  );
};

export default ShortProfile;
