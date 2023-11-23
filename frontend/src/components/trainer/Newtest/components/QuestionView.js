import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { Button, Flex, message } from "antd";

import { Question } from "../../../common/QuestionDetails/components/Question";

import apis from "../../../../services/Apis";
import { SecurePost } from "../../../../services/axiosCall";

import { sectionStruct, buttonStruct } from "./struct";

const FinalQuestionView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [testId, setTestId] = useState(null);
  const test = useSelector((state) => state.test);

  const createtest = () => {
    SecurePost({
      url: apis.CREATE_TEST,
      data: {
        type: test.newtestFormData.testType,
        title: test.newtestFormData.testTitle,
        questions: test.newtestFormData.testQuestions,
        duration: test.newtestFormData.testDuration,
        subjects: test.newtestFormData.testSubject,
        organisation: test.newtestFormData.OrganisationName,
      },
    })
      .then((response) => {
        if (response.data.success) {
          messageApi.success(
            `Test paper Created Successfully!
            Please wait, you will automatically be redirected to conduct test page.`
          );
          setTimeout(() => {
            setTestId(response.data.testid);
          }, 3000);
        } else {
          messageApi.error(response.data.message);
        }
      })
      .catch(() => {
        messageApi.error("Server Error");
      });
  };

  if (testId) {
    return <Navigate to={`/user/conducttest?testid=${testId}`} />;
  } else {
    return (
      <Flex {...sectionStruct}>
        {contextHolder}
        {test.questionsAvailablebasedonSubject
          .filter((question) =>
            test.newtestFormData.testQuestions.includes(question._id)
          )
          .map((selectedQuestion) => (
            <Question details={selectedQuestion} />
          ))}

        <Button {...buttonStruct} onClick={createtest}>
          Create Test
        </Button>
      </Flex>
    );
  }
};

export default FinalQuestionView;
