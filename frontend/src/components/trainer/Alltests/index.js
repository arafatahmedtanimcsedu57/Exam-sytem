import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Typography, Card, Flex } from "antd";

import { handleTestTableData } from "../../../actions/trainer.action";

import { headingStruct, getStaticColumns, tableStruct } from "./struct";

const { Title } = Typography;

const AllTests = () => {
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);

  const getActions = (key) => null;
  const columns = [...getStaticColumns(getActions)];

  useEffect(() => dispatch(handleTestTableData()), []);

  return (
    <>
      <Card>
        <Flex {...headingStruct}>
          <Title level={3}>List of Tests</Title>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainer.testTableData}
          loading={trainer.testTableLoading}
        />
      </Card>
    </>
  );
};

export default AllTests;
