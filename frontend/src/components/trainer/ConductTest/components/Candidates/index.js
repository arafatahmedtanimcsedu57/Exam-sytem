import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, Typography } from "antd";

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
  const [examLink, setExamLink] = useState("");
  const [answerSheet, setAnswerSheet] = useState(null);

  const dispatch = useDispatch();

  const candidates = useSelector((state) => state.candidate);
  const { candidates: candidateList, candidatesLoading } = candidates;

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails } = trainerTest;

  const fetchCandidates = () => {
    dispatch(getCandidates(id));
  };

  const fetchAnswerSheet = (trainerId) => {
    setAnswerSheet(null);
    SecurePost({
      url: `${apis.GET_RESULTS}/trainee-result`,
      data: { testId: id, trainerId },
    })
      .then((response) => {
        if (response.data.success) setAnswerSheet(response.data.data);
        else {
          setAnswerSheet(null);
        }
      })
      .catch(() => {
        setAnswerSheet(null);
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
          <Button onClick={() => fetchAnswerSheet(key)}>Answer Sheet</Button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );

  const columns = [...getCandidateStaticColumns(getActions)];

  console.log(answerSheet, "ARAFAT");

  return (
    <>
      <Button loading={candidatesLoading} onClick={fetchCandidates}>
        Reload!
      </Button>

      <Table
        {...tableStruct}
        columns={columns}
        dataSource={candidateList}
        loading={candidatesLoading}
      />
    </>
  );
};

export default Candidates;
