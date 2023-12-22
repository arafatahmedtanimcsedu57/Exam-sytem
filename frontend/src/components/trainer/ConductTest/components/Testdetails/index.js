import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";

import { getTest } from "../../../../../actions/trainerTest.action";

import { getStaticColumns, tableStruct } from "./struct";

const TestDetails = ({ testId }) => {
  const dispatch = useDispatch();

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails, trainerTestLoading } = trainerTest;

  const getActions = () => null;
  const columns = [...getStaticColumns(getActions)];

  useEffect(() => {
    dispatch(getTest(testId));
  }, []);

  return (
    trainerTestDetails && (
      <Table
        {...tableStruct}
        columns={columns}
        dataSource={[{ ...trainerTestDetails }]}
        loading={trainerTestLoading}
      />
    )
  );
};

export default TestDetails;
