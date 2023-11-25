import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { CopyOutlined } from "@ant-design/icons";
import {
  Input,
  Flex,
  Button,
  Typography,
  Alert,
  Card,
  Divider,
  message,
  Space,
  Badge
} from "antd";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  setConductTestId,
  handleTestRegisterStatus,
  handleTestStatus,
  setTestRegisterLink,
  updateCurrentTestBasicDetails,
} from "../../../actions/conductTest.action";
import { handleTestDetailsModal } from "../../../actions/trainer.action";

import Candidates from "./components/Candidates";

import TestDetails from "./../../trainer/Alltests/components/Testdetails";

import { actionSectionStruct } from "./struct";

const { Title, Text } = Typography;
const { Search } = Input;

const ConductTestS = ({ testid }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);
  const conduct = useSelector((state) => state.conduct);

  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get("testid"));
  const [registrationLink, setRegistrationLink] = useState("");

  const changeLocalTestId = (searchId) => {
    setSearchParams((params) => {
      params.set("testid", searchId);
      return params;
    });
    setLocalTestId(searchId);
  };

  const changeRegistrationStatus = (isRegistrationavailable) => {
    SecurePost({
      url: `${apis.STOP_REGISTRATION}`,
      data: {
        id: conduct.id,
        status: isRegistrationavailable,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTestRegisterStatus(isRegistrationavailable));
          messageApi.success("Registration status changed");
        } else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error"));
  };


  const changeTestStatus = () => {
    SecurePost({
      url: `${apis.START_TEST_BY_TRAINER}`,
      data: {
        id: conduct.id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTestStatus(response.data.data));
          messageApi.success("Test has begin");
        } else messageApi.error(response.data.message);
      })
      .catch(() => messageApi.error("Server Error")
      );
  };

  const endTestByTrainee = () => {
    SecurePost({
      url: `${apis.END_TEST_BY_TRAINER}`,
      data: {
        id: conduct.id,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(handleTestStatus(response.data.data));
          messageApi.success("Test has ended");
        } else {
          messageApi.error(response.data.message);
        }
      })
      .catch(() => messageApi.error("Server Error"));
  };


  useEffect(() => {
    if (localTestId) {
      var link = window.location.href.split("/").splice(0, 3);
      var mainlink = "";
      link.forEach((d, i) => {
        mainlink = mainlink + d + "/";
      });
      mainlink = mainlink + `trainee/register?testid=${localTestId}`;
      setRegistrationLink(mainlink);

      dispatch(setTestRegisterLink(mainlink));
      dispatch(updateCurrentTestBasicDetails(localTestId));
      dispatch(setConductTestId(localTestId));
      dispatch(handleTestDetailsModal(false, localTestId));

      return () => {
        dispatch(setTestRegisterLink(""));
        dispatch(updateCurrentTestBasicDetails(null));
        dispatch(setConductTestId(null));
        dispatch(handleTestDetailsModal(false, null));

      }
    }
  }, [localTestId]);

  return !conduct.id ? (
    <Card>
      <Title level={5}>Enter Test Id</Title>

      <Search allowClear enterButton="Enter" onSearch={changeLocalTestId} />
    </Card>
  ) : conduct.basicTestDetails.testconducted ? (
    <Alert
      message="The Test has ended! Go to all tests to check the results"
      type="warning"
      showIcon
    />
  ) : (
    <Card>
      {contextHolder}
      <TestDetails />
      <Divider />
      <Input
        disabled={true}
        value={`${registrationLink}`}
        addonAfter={
          <CopyToClipboard
            text={`${registrationLink}`}
            onCopy={() => messageApi.success("Link Copied to clipboard")}
          >
            <CopyOutlined />
          </CopyToClipboard>
        }
      />
      <Divider />
      <Flex {...actionSectionStruct}>
        <Space>
          <Badge
            status={conduct.basicTestDetails.isRegistrationavailable
              ? "processing"
              : "default"}
            text={conduct.basicTestDetails.isRegistrationavailable
              ? "Registration Ongoing"
              : "Registration Stoped"}
          />
          <Button
            disabled={conduct.basicTestDetails.testbegins}
            onClick={() => {
              changeRegistrationStatus(
                !conduct.basicTestDetails.isRegistrationavailable
              );
            }}
            type={"primary"}
            danger={conduct.basicTestDetails.isRegistrationavailable}
          >
            {conduct.basicTestDetails.isRegistrationavailable
              ? "Stop Registration"
              : "Open Registration"}
          </Button></Space>
        {/* <Details /> */}
        <Space>
          <Button
            disabled={conduct.basicTestDetails.testbegins}
            onClick={() => {
              changeTestStatus();
            }}
          >
            Start Test
          </Button>
          <Button
            disabled={!conduct.basicTestDetails.testbegins}
            onClick={() => {
              endTestByTrainee();
            }}
          >
            End Test
          </Button>
        </Space>
      </Flex>

      <Divider />
      <Candidates />

    </Card>
  );
};

export default ConductTestS;
