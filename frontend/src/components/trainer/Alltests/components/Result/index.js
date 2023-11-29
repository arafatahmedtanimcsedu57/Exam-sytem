import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { CopyOutlined } from "@ant-design/icons";
import { Table, Input, Button, message } from "antd";

import apis from "../../../../../services/Apis";
import { SecurePost } from "../../../../../services/axiosCall";

import { getCandidateResultsStaticColumns, tableStruct } from "./struct";

const CandidateResults = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [examLink, setExamLink] = useState("");
  const [result, setResult] = useState(null);

  const conduct = useSelector((state) => state.conduct);

  const refreshUserList = () => {
    setLoading(true);
    SecurePost({
      url: `${apis.GET_STATS}`,
      data: { testId: conduct.resultTestId },
    })
      .then((response) => {
        if (response.data.success) setResult(response.data.data);
        else messageApi.error(response.data.message);

        setLoading(false);
      })
      .catch(() => {
        messageApi.error("Server Error");
        setLoading(false);
      });
  };

  useState(() => {
    var link = window.location.href.split("/").splice(0, 3);
    var mainlink = "";
    link.forEach((d, i) => {
      mainlink = mainlink + d + "/";
    });
    mainlink = `${mainlink}trainee/taketest?testId=${conduct.id}&traineeId=`;
    setExamLink(mainlink);

    refreshUserList();
  }, []);

  const getActions = (key) => (
    <Input
      disabled={true}
      value={`${examLink}${key}`}
      addonAfter={
        <CopyToClipboard
          text={`${examLink}${key}`}
          onCopy={() => messageApi.success("Link Copied to clipboard")}
        >
          <CopyOutlined />
        </CopyToClipboard>
      }
    />
  );

  const columns = [...getCandidateResultsStaticColumns(getActions)];

  return (
    <>
      {contextHolder}
      <Button loading={loading} onClick={refreshUserList}>
        Reload!
      </Button>

      <Table
        {...tableStruct}
        columns={columns}
        dataSource={result}
        loading={loading}
      />
    </>
  );
};

export default CandidateResults;
