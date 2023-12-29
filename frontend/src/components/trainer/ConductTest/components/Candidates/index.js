import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, Typography, message, Modal } from "antd";

import AnswerSheet from "../AnswerSheet";

import { getCandidates } from "../../../../../actions/candidate.action";

import apis from "../../../../../services/Apis";
import { SecurePost } from "../../../../../services/axiosCall";

import {
  getCandidateStaticColumns,
  tableStruct,
  testLinkStruct,
} from "./struct";

const { Text } = Typography;

const Candidates = ({ id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [examLink, setExamLink] = useState("");

  const [searchingAnswerSheet, setSearchingAnswerSheet] = useState(null);
  const [answerSheet, setAnswerSheet] = useState(null);

  const dispatch = useDispatch();

  const candidates = useSelector((state) => state.candidate);
  const { candidates: candidateList, candidatesLoading } = candidates;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails } = trainerTest;

  const closeModal = () => setAnswerSheet(null);

  const fetchCandidates = () => {
    dispatch(getCandidates(id));
  };

  const fetchAnswerSheet = (trainerId) => {
    setSearchingAnswerSheet(trainerId);
    setAnswerSheet(null);
    SecurePost({
      url: `${apis.GET_RESULTS}/trainee-result`,
      data: { testId: id, trainerId },
    })
      .then((response) => {
        if (response.data.success) {
          const _answerSheet = response.data.data;
          if (_answerSheet)
            _answerSheet.test.questions.forEach((question) => {
              // Find the corresponding answer in the result
              const answer = _answerSheet.result.answerSheet.find(
                (answer) => answer.questionId === question._id
              );

              // Add the chosen option to the question
              question.chosenOption = answer ? answer.chosenOption : null;
            });
          setAnswerSheet(_answerSheet);
        } else {
          messageApi.error("Answer Sheet Not Found");
          setAnswerSheet(null);
        }
        setSearchingAnswerSheet(null);
      })
      .catch(() => {
        messageApi.error("Answer Sheet Not Found");
        setAnswerSheet(null);
        setSearchingAnswerSheet(null);
      });
  };

  useState(() => {
    var link = window.location.href.split("/").splice(0, 3);
    var mainlink = "";
    link.forEach((d) => {
      mainlink = mainlink + d + "/";
    });
    mainlink = `${mainlink}trainee/taketest?testId=${id}&traineeId=`;
    setExamLink(mainlink);

    fetchCandidates();
  }, []);

  const getActions = (key) => (
    <>
      <Text {...testLinkStruct}>{`${examLink}${key}`}</Text>
      {trainerTestDetails && trainerTestDetails.testConducted ? (
        trainerTestDetails.isResultGenerated ? (
          <Button
            onClick={() => fetchAnswerSheet(key)}
            loading={searchingAnswerSheet === key}
          >
            Answer Sheet
          </Button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );

  const columns = [...getCandidateStaticColumns(getActions)];

  return (
    <>
      {contextHolder}
      <Button loading={candidatesLoading} onClick={fetchCandidates}>
        Reload!
      </Button>

      <Table
        {...tableStruct}
        columns={columns}
        dataSource={candidateList}
        loading={candidatesLoading}
      />

      <Modal
        open={answerSheet}
        title="Answer Paper"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <AnswerSheet answerSheet={answerSheet} />
      </Modal>
    </>
  );
};

export default Candidates;
