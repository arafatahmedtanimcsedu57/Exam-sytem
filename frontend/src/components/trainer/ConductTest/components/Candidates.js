import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { CopyOutlined } from "@ant-design/icons";
import { Table, Input, Button, message, Divider } from "antd";

import { updateCandidatesTest } from "../../../../actions/conductTest.action";

import apis from "../../../../services/Apis";
import { SecurePost } from "../../../../services/axiosCall";

import { getCandidateStaticColumns, tableStruct } from "./struct";

const Candidates = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [mainlink, setMainlink] = useState("");

  const conduct = useSelector((state) => state.conduct);

  const refreshUserList = () => {
    setLoading(true);
    SecurePost({
      url: `${apis.GET_TEST_CANDIDATES}`,
      data: {
        id: conduct.id,
      },
    })
      .then((response) => {
        if (response.data.success)
          dispatch(updateCandidatesTest(response.data.data));
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
    var _mainlink = "";
    link.forEach((d, i) => {
      _mainlink = _mainlink + d + "/";
    });
    setMainlink(mainlink);
    refreshUserList();
  }, []);

  const getActions = (key) => (
    <Input
      disabled={true}
      value={`${mainlink}trainee/taketest?testid=${conduct.id}&traineeid=${key}`}
      addonAfter={
        <CopyToClipboard
          text={`${mainlink}trainee/taketest?testid=${conduct.id}&traineeid=${key}`}
          onCopy={() => message.success("Link Copied to clipboard")}
        >
          <CopyOutlined />
        </CopyToClipboard>
      }
    />
  );

  const columns = [...getCandidateStaticColumns(getActions)];

  return (
    <>
      {contextHolder}
      <Button loading={loading} onClick={refreshUserList}>
        Reload!
      </Button>

      <Table
        {...tableStruct}
        columns={columns}
        dataSource={conduct.registeredCandidates}
        loading={loading}
      />
    </>
  );
};

export default Candidates;
