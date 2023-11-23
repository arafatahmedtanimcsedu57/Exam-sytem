import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { Input, Button, Typography, Tabs, Alert, Card } from "antd";

import {
  changeConducttestId,
  updateCandidatesTest,
  updateQuestiosnTest,
} from "../../../actions/conductTest";

import {
  ChangeTestDetailsModalState,
} from "../../../actions/trainerAction";

// import TestDetails from "./components/Details";
// import Candidates from "./components/candidates";
// import Questions from "./components/questions";

import TestDetails from "./../../trainer/Alltests/components/Testdetails"

const { TabPane } = Tabs;
const { Title } = Typography;
const { Search } = Input;

const ConductTestS = ({ testid }) => {
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);
  const conduct = useSelector((state) => state.conduct);

  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get('testid'));

  const changeLocalTestId = (searchId) => {
    setSearchParams(params => {
      params.set('testid', searchId);
      return params
    });
    setLocalTestId(searchId);
  }

  useEffect(() => {
    dispatch(changeConducttestId(localTestId))
    dispatch(ChangeTestDetailsModalState(false, localTestId))
  }, [localTestId]);


  return (
    !conduct.id ? (
      <Card>
        <Title level={5}>Enter Test Id</Title>

        <Search
          allowClear
          enterButton="Enter"
          onSearch={changeLocalTestId}
        />

      </Card>
    ) : (

      conduct.basictestdetails.testconducted ?
        <Alert
          message="The Test has ended! Go to all tests to check the results"
          type="warning"
          showIcon
        /> :
        <Card>
          <TestDetails />
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
    )
  );
}


export default ConductTestS;