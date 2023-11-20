import React from "react";
import { connect } from "react-redux";
import { Tabs, Button } from "antd";

import {
  changeStep,
  changeBasicNewTestDetails,
} from "../../../actions/testAction";

import GeneraterandomQuestion from "./generaterandomquestion";

import "./newtest.css";

const { TabPane } = Tabs;

function SelectQuestion(props) {
  const questionCount = (
    <Button size="large">
      Question Selected : {props.test.newtestFormData.testQuestions.length}
    </Button>
  );
  return (
    <>
      <Tabs defaultActiveKey="1" tabBarExtraContent={questionCount}>
        <TabPane tab="Questions-Manually" key="1">
          <GeneraterandomQuestion mode="manual" />
        </TabPane>
        <TabPane tab="Questions-Random" key="2" disabled>
          <GeneraterandomQuestion mode="random" />
        </TabPane>
      </Tabs>

      <Button
        style={{ marginTop: "24px" }}
        type="primary"
        size="large"
        onClick={() => props.changeStep(2)}
      >
        Next
      </Button>
    </>
  );
}

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, {
  changeStep,
  changeBasicNewTestDetails,
})(SelectQuestion);
