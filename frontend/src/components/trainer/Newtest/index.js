import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Typography, Card, Flex } from "antd";

import { steps } from "../../../services/steps";

import BasicTestForm from "./components/BasicForm";
import SelectQuestion from "./components/SelectQuestion";
// import FinalQuestionView from "./questionview";

import { changeStep } from "../../../actions/testAction";
import { ChangeSubjectTableData } from "../../../actions/adminAction";

const { Step } = Steps;
const { Title } = Typography;

const NewTest = () => {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(ChangeSubjectTableData())
  }, [])

  var torender = "";

  if (test.currentStep === 0) torender = <BasicTestForm />;
  else if (test.currentStep === 1) torender = <SelectQuestion />;
  console.log(test, "TEST")

  // else if (this.props.test.currentStep === 2) {
  //   torender = <FinalQuestionView />;
  // } else {
  //   ;
  // }
  return (
    <Card>
      <Flex>
        <Title level={3}>Create New Test</Title>
      </Flex>
      <Steps current={test.currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {torender}
    </Card>
  );
}

export default NewTest;

//<div className="test-create-section__content"></div>