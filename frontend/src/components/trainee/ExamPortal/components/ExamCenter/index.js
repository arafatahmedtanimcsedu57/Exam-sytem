import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Typography, Flex, Skeleton, Alert } from "antd";

import { fetchExamState } from "../../../../../actions/traineeAction";

// import { profileStruct, profileSectionStruct,  } from "./struct";

const { Text } = Typography;

const ExamCenter = ({ testId, traineeId }) => {
  const dispatch = useDispatch();

  const trainee = useSelector((state) => state.trainee);
  const {
    examState: { loading, data, error },
  } = trainee;

  useEffect(() => dispatch(fetchExamState(testId, traineeId)), []);

  return (
    <>
      {loading && <Skeleton paragraph={{ rows: 2 }} />}
      {data && <>{JSON.stringify(data)}</>}
      {error && <Alert message={error} type="error" />}
    </>
  );
};

export default ExamCenter;
