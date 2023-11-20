import React from "react";
import { connect } from "react-redux";
import { Steps, Typography } from "antd";

import { steps } from "../../../services/steps";

import BasicTestForm from "./basicForm";
import SelectQuestion from "./selectQuestion";
import FinalQuestionView from "./questionview";

import { changeStep } from "../../../actions/testAction";
import { ChangeSubjectTableData } from "../../../actions/adminAction";

import "./newtest.css";

const { Step } = Steps;
const { Title } = Typography;

class NewTest extends React.Component {
  componentDidMount() {
    this.props.ChangeSubjectTableData();
  }
  render() {
    var torender = "";
    if (this.props.test.currentStep === 1) {
      torender = <SelectQuestion />;
    } else if (this.props.test.currentStep === 2) {
      torender = <FinalQuestionView />;
    } else {
      torender = <BasicTestForm />;
    }
    return (
      <div className="test-create-section">
        <div className="test-create-section__heading">
          <Title level={3}>Create New Test</Title>
        </div>
        <Steps size="large" current={this.props.test.currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="test-create-section__content">{torender}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, {
  changeStep,
  ChangeSubjectTableData,
})(NewTest);
