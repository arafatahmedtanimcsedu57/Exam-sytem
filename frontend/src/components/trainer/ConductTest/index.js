import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { CopyOutlined } from "@ant-design/icons";
import { Input, Typography, Alert, Card, Divider, message } from "antd";

import { setTestRegisterLink } from "../../../actions/conductTest.action";

import Candidates from "./components/Candidates";
import TestDetails from "./components/Testdetails";
import TestAction from "./components/TestActions";

const { Title } = Typography;
const { Search } = Input;

const ConductTestS = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const conduct = useSelector((state) => state.conduct);

  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get("testId"));

  const { testRegisterLink } = conduct;

  const changeLocalTestId = (searchId) => {
    setSearchParams((params) => {
      params.set("testId", searchId);
      return params;
    });
    setLocalTestId(searchId);
  };

  useEffect(() => {
    if (localTestId) {
      var link = window.location.href.split("/").splice(0, 3);
      var mainlink = "";
      link.forEach((d) => (mainlink = mainlink + d + "/"));

      mainlink = mainlink + `trainee/register?testId=${localTestId}`;
      dispatch(setTestRegisterLink(mainlink));
    }
  }, [localTestId]);

  return !localTestId ? (
    <Card>
      <Title level={5}>Enter Test Id</Title>

      <Search allowClear enterButton="Enter" onSearch={changeLocalTestId} />
    </Card>
  ) : conduct.testDetails && conduct.testDetails.testConducted ? (
    <div>
      <Alert
        message="Warning"
        description="The Test has ended! Go to all tests to check the results"
        type="warning"
        showIcon
      />
    </div>
  ) : (
    <Card>
      {contextHolder}
      <TestDetails id={localTestId} />
      <Divider />
      <Input
        disabled={true}
        value={`${testRegisterLink}`}
        addonAfter={
          <CopyToClipboard
            text={`${testRegisterLink}`}
            onCopy={() => messageApi.success("Link Copied to clipboard")}
          >
            <CopyOutlined />
          </CopyToClipboard>
        }
      />

      <Divider />
      <TestAction id={localTestId} />
      <Divider />
      <Candidates id={localTestId} />
    </Card>
  );
};

export default ConductTestS;
