import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  Input,
  Flex,
  Button,
  Typography,
  Tabs,
  Alert,
  Card,
  Divider,
  message,
} from "antd";

import { SecurePost } from "../../../services/axiosCall";
import apis from "../../../services/Apis";

import {
  setConductTestId,
  handleTestRegisterStatus,
  setTestRegisterLink,
  updateCurrentTestBasicDetails,
  updateCandidatesTest,
  updateQuestiosnTest,
} from "../../../actions/conductTest.action";

import { handleTestDetailsModal } from "../../../actions/trainer.action";

// import Details from "./components/Details";
import Candidates from "./components/Candidates";
// import Questions from "./components/questions";

import TestDetails from "./../../trainer/Alltests/components/Testdetails";

const { Title } = Typography;
const { Search } = Input;

const ConductTestS = ({ testid }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);
  const conduct = useSelector((state) => state.conduct);

  console.log(conduct, "CONDUCT");

  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get("testid"));

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

  useEffect(() => {
    if (localTestId) {
      var link = window.location.href.split("/").splice(0, 3);
      var mainlink = "";
      link.forEach((d, i) => {
        mainlink = mainlink + d + "/";
      });
      mainlink = mainlink + `trainee/register?testid=${localTestId}`;

      dispatch(setTestRegisterLink(mainlink));
      dispatch(updateCurrentTestBasicDetails(localTestId));
      dispatch(setConductTestId(localTestId));
      dispatch(handleTestDetailsModal(false, localTestId));
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
      <TestDetails />
      <Divider />
      <Flex>
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
        </Button>
        {/* <Details /> */}
      </Flex>

      <Divider />
      <Candidates />
      {/* <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
            <TabPane
              tab={
                <span>
                  Registered Trainee
                </span>
              }
              key="1"
            >
              <Candidates />
            </TabPane>
            <TabPane
              tab={
                <span>

                  Questions
                </span>
              }
              key="2"
            >
              <Questions
                id={this.props.conduct.id}
                questionsOfTest={this.props.conduct.questionsOfTest}
                updateQuestiosnTest={this.props.updateQuestiosnTest}
              />
            </TabPane>
          </Tabs> */}
    </Card>
  );
};

export default ConductTestS;
