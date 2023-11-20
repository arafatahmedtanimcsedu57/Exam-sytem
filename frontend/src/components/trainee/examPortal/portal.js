import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { Typography, Skeleton, Alert } from "antd";

import Instruction from "./instruction";
import TestBoard from "./testBoard";

import Answer from "../answersheet/answer";

import {
  fetchTraineedata,
  setTestDetsils,
  fetchTestdata,
} from "../../../actions/traineeAction";

import "./portal.css";
const { Title } = Typography;

class MainPortal extends Component {
  constructor(props) {
    super(props);
    let params = queryString.parse(this.props.location.search);
    this.state = {
      testDetails: params,
    };
    this.props.setTestDetsils(params.testid, params.traineeid);
  }

  componentDidMount() {
    this.props.fetchTraineedata(this.state.testDetails.traineeid);
    this.props.fetchTestdata(
      this.state.testDetails.testid,
      this.state.testDetails.traineeid
    );
  }

  render() {
    if (
      this.props.trainee.initialloading2 ||
      this.props.trainee.initialloading1
    ) {
      return (
        <div>
          <Skeleton active />
          <Skeleton active />
        </div>
      );
    } else {
      if (this.props.trainee.invalidUrl) {
        return (window.location.href = ``);
      } else {
        if (this.props.trainee.LocaltestDone) {
          return (
            <div>
              <Answer />
            </div>
          );
        } else {
          if (this.props.trainee.testconducted) {
            return (
              <div>
                <div>
                  <Alert
                    message="
                    The Test is Over!
                    You are late."
                    type="danger"
                    showIcon
                  />
                </div>
              </div>
            );
          } else {
            if (!this.props.trainee.testbegins) {
              return (
                <div>
                  <div>
                    <Alert
                      message="
                      The test has not started yet. Wait for the trainer's
                      instruction then refresh the page."
                      showIcon
                    />
                  </div>
                </div>
              );
            } else {
              if (this.props.trainee.startedWriting) {
                return (
                  <div>
                    <TestBoard />
                  </div>
                );
              } else {
                return (
                  <div>
                    <Instruction />
                  </div>
                );
              }
            }
          }
        }
      }
    }
  }
}

const mapStateToProps = (state) => ({
  trainee: state.trainee,
});

export default connect(mapStateToProps, {
  fetchTraineedata,
  setTestDetsils,
  fetchTestdata,
})(MainPortal);
