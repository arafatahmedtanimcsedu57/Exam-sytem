import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Tag, Flex, Skeleton, Alert } from "antd";

import Clock from "../Clock";

import { fetchTrainee } from "../../../../../actions/traineeAction";

import { profileStruct, profileSectionStruct, textStruct } from "./struct";

const { Text } = Typography;

const Trainee = ({ id }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    traineeInfo: { loading, data, error },
  } = trainee;

  useEffect(() => dispatch(fetchTrainee(id)), []);

  return (
    <Card {...profileStruct}>
      {loading && <Skeleton paragraph={{ rows: 1 }} />}
      {data && (
        <Flex {...profileSectionStruct}>
          <Text>{data.name}</Text>
          {/* <Tag {...textStruct.tag}>
          <Clock />
        </Tag> */}
        </Flex>
      )}
      {error && <Alert message={error} type="error" />}
    </Card>
  );
};

export default Trainee;
