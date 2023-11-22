import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { changeStep } from "../../../../actions/testAction";

import GeneraterandomQuestion from "./generaterandomquestion";

function SelectQuestion() {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);

  const questionCount = (
    <Button>
      Question Selected : {test.newtestFormData.testQuestions.length}
    </Button>
  );
  return (
    <>
      <GeneraterandomQuestion />

      {/* <TabPane tab="Questions-Random" key="2" disabled>
          <GeneraterandomQuestion mode="random" />
        </TabPane> */}

      <Button
        onClick={() => dispatch(changeStep(2))}
      >
        Next
      </Button>
    </>
  );
}

export default SelectQuestion
