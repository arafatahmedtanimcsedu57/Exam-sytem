import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Steps, Typography, Card, Flex } from "antd";

import { steps } from "../../../services/steps";

import { ChangeSubjectTableData } from "../../../actions/adminAction";

import BasicTestForm from "./components/BasicForm";
import SelectQuestion from "./components/SelectQuestion";
import FinalQuestionView from "./components/QuestionView";

import { newTestSection } from "./struct";

const { Step } = Steps;
const { Title } = Typography;

const NewTest = () => {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(ChangeSubjectTableData());
  }, []);

  var torender = "";
  if (test.currentStep === 0) torender = <BasicTestForm />;
  else if (test.currentStep === 1) torender = <SelectQuestion />;
  else torender = <FinalQuestionView />;

  return (
    <Card>
      <Flex>
        <Title level={3}>Create New Test</Title>
      </Flex>
      <>
        <Steps {...newTestSection} current={test.currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {torender}
      </>
    </Card>
  );
};

export default NewTest;
