import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Skeleton, message } from "antd";

import { SecureGet, SecurePost } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

import { getStaticColumns, tableStruct } from "./struct";

const TestDetails = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const conduct = useSelector((state) => state.conduct);
  const { id } = conduct;

  const [testdetails, setTestdetails] = useState(null);
  const [stats, setStats] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getActions = (key) => null;
  const columns = [...getStaticColumns(getActions)];

  useState(() => {
    var p1 = SecureGet({ url: `${apis.GET_ALL_TESTS}/${id}` });
    var p2 = SecurePost({ url: apis.GET_STATS, data: { testid: id } });
    var p3 = SecurePost({ url: apis.GET_EXCEL, data: { id } });

    Promise.all([p1, p2, p3])
      .then((response) => {
        if (
          response[0].data.success &&
          response[1].data.success &&
          response[2].data.success
        ) {
          setTestdetails(response[0].data.data);
          setStats(response[1].data.data);
          setFile(response[2].data.file);

          setLoading(false);
        } else {
          messageApi.error(
            response[0].data.message +
              response[1].data.message +
              response[2].data.message
          );
        }
      })
      .catch(() => messageApi.error("Server Error."));
  }, []);

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        {contextHolder}
        {testdetails && (
          <Table
            {...tableStruct}
            columns={columns}
            dataSource={[{ ...testdetails }]}
          />
        )}
      </>
    );
  }
};

export default TestDetails;
