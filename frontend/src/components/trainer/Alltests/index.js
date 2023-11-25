import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Typography, Card, Flex, Modal, Button } from "antd";

import { handleTestTableData } from "../../../actions/trainer.action";
import {
  setResultTestId,
} from "../../../actions/conductTest.action";

import { headingStruct, getStaticColumns, tableStruct } from "./struct";
import CandidateResults from "./components/Result";

const { Title } = Typography;

const AllTests = () => {
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);
  const [showModal, setShowModal] = useState(false);

  const getActions = (key) => <Button onClick={() => { setShowModal(true); dispatch(setResultTestId(key)) }}>Result</Button>;
  const closeModal = () => { setShowModal(false); dispatch(setResultTestId(null)) };

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

        <Modal
          open={showModal}
          title="Result"
          onCancel={closeModal}
          destroyOnClose={true}
          footer={[]}
        >
          <CandidateResults />
        </Modal>
      </Card>
    </>
  );
};

export default AllTests;
