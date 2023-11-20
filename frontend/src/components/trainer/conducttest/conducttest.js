import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Button, Typography, Tabs, Icon, Alert } from "antd";

import {
  changeConducttestId,
  updateCandidatesTest,
  updateQuestiosnTest,
} from "../../../actions/conductTest";

import TestDetails from "./details";
import Candidates from "./candidates";
import Questions from "./questions";

import "./conducttes.css";

const { TabPane } = Tabs;

const { Title } = Typography;

class ConductTestS extends Component {
  constructor(props) {
    super(props);
    this.props.changeConducttestId(this.props.testid);
    this.state = {
      localTestId: null,
      needRedirect: false,
    };
  }

  ChangeLocalTestId = (d) => {
    this.setState({
      localTestId: d.target.value,
    });
  };

  ChangetestId = (d) => {
    this.setState({
      needRedirect: true,
    });
  };

  render() {
    if (this.state.needRedirect) {
      return (window.location.href = `/user/conducttest?testid=${this.state.localTestId}`);
    } else {
      return (
        <div className="wrapper--conduct-test">
          {!this.props.conduct.id ? (
            <div>
              <Title level={3}>Enter Test Id</Title>
              <div className="conduct-test--info">
                <Input
                  placeholder="Enter test id"
                  onChange={this.ChangeLocalTestId}
                  value={this.state.localTestId}
                  size="large"
                />
                <div>
                  <Button
                    onClick={this.ChangetestId}
                    type="primary"
                    size="large"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <CC key={this.props.conduct.basictestdetails.testconducted} />
            </div>
          )}
        </div>
      );
    }
  }
}

class C extends Component {
  render() {
    if (this.props.conduct.basictestdetails.testconducted) {
      return (
        <Alert
          message="The Test has ended! Go to all tests to check the results"
          type="warning"
          showIcon
        />
      );
    } else {
      return (
        <>
          <TestDetails />
          <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
            <TabPane
              tab={
                <span>
                  <Icon type="user" />
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
                  <Icon type="question-circle" />
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
          </Tabs>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  trainer: state.trainer,
  conduct: state.conduct,
});

let CC = connect(mapStateToProps, {
  changeConducttestId,
  updateCandidatesTest,
  updateQuestiosnTest,
})(C);

export default connect(mapStateToProps, {
  changeConducttestId,
  updateCandidatesTest,
  updateQuestiosnTest,
})(ConductTestS);
