import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";

import { fetchTestDetails } from "../../../../../actions/conductTest.action";

import { getStaticColumns, tableStruct } from "./struct";

const TestDetails = ({ id }) => {
  const dispatch = useDispatch();

  const conduct = useSelector((state) => state.conduct);
  const { testDetails } = conduct;

  const getActions = () => null;
  const columns = [...getStaticColumns(getActions)];

  useEffect(() => {
    dispatch(fetchTestDetails(id));
  }, []);

  return (
    testDetails && (
      <Table
        {...tableStruct}
        columns={columns}
        dataSource={[{ ...testDetails }]}
      />
    )
  );
};

export default TestDetails;
