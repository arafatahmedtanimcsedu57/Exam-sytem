import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Flex, Badge, Spin } from "antd";

import { getTrainee } from "../../../../../actions/trainee.action";

import {
  profileStruct,
  profileSectionStruct,
  textStruct,
  badgeStruct,
} from "./struct";

const { Text, Title } = Typography;

const Trainee = ({ id }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    traineeInfo: { data, loading },
  } = trainee;

  useEffect(() => dispatch(getTrainee(id)), []);

  return (
    <>
      {data ? (
        <Badge.Ribbon text={data.type || "STUDENT"} {...badgeStruct}>
          <Card {...profileStruct}>
            <Flex {...profileSectionStruct}>
              <Title {...textStruct.title}>{data.name.toUpperCase()}</Title>
              <Text {...textStruct.text}>{data.emailId}</Text>
              <Text {...textStruct.text}>{data.contact}</Text>
              <Text {...textStruct.textWarning}>
                {data.organisation}, {data.location}
              </Text>
            </Flex>
          </Card>
        </Badge.Ribbon>
      ) : (
        <></>
      )}
      {loading ? <Spin /> : <></>}
    </>
  );
};

export default Trainee;
