import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Tag, Flex, Skeleton, Alert } from "antd";

import Clock from "../Clock";

import { fetchTrainee } from "../../../../../actions/trainee.action";

import { profileStruct, profileSectionStruct, textStruct } from "./struct";

const { Text } = Typography;

const Trainee = ({ id }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    traineeInfo: { data },
  } = trainee;

  useEffect(() => dispatch(fetchTrainee(id)), []);

  return (
    <Card {...profileStruct}>
      {data && (
        <Flex {...profileSectionStruct}>
          <Text>{data.name}</Text>
        </Flex>
      )}
    </Card>
  );
};

export default Trainee;
