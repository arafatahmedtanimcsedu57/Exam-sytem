import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Typography, Modal, Card, Flex } from "antd";

import {
  ChangeTestTableData,
  ChangeTestDetailsModalState,
} from "../../../actions/trainerAction";

import TestDetails from "./components/Testdetails";

import { headingStruct, getStaticColumns, tableStruct } from "./struct";

const { Title } = Typography;

const AllTests = () => {
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);

  const closeModal = () => dispatch(ChangeTestDetailsModalState(false, null));

  useEffect(() => {
    dispatch(ChangeTestTableData());
  }, []);

  const getActions = (key) =>
    // <Button
    //   {...detailsButtonStruct}
    //   icon={<InfoCircleOutlined />}
    //   onClick={() => openModal(key)}
    // />
    // <></>
    null;

  const columns = [...getStaticColumns(getActions)];

  return (
    <>
      <Card>
        <Flex {...headingStruct}>
          <Title level={3}>List of Tests</Title>
        </Flex>

        <Table
          {...tableStruct}
          columns={columns}
          dataSource={trainer.TestTableData}
          loading={trainer.TestTableLoading}
        />
      </Card>
      <Modal
        open={trainer.TestDetailsmodalOpened}
        title="Test details"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <TestDetails />
      </Modal>
    </>
  );
};

export default AllTests;
