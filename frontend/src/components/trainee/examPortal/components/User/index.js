import React from "react";
import { useSelector } from "react-redux";

import { Card, Typography, Tag, Flex } from "antd";

import Clock from "../Clock";

import { profileStruct, profileSectionStruct, textStruct } from "./struct";

const { Text } = Typography;

const Trainee = () => {
  const trainee = useSelector((state) => state.trainee);

  return trainee.traineeDetails.name ? (
    <Card {...profileStruct}>
      <Flex {...profileSectionStruct}>
        <Text>{trainee.traineeDetails.name}</Text>
        <Tag {...textStruct.tag}>
          <Clock />
        </Tag>
      </Flex>
    </Card>
  ) : (
    <></>
  );
};

export default Trainee;
