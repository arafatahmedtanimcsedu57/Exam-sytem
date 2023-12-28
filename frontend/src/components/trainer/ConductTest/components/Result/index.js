import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { message, Statistic, Card, Badge, Flex, Col, Row } from "antd";

import apis from "../../../../../services/Apis";
import { SecurePost } from "../../../../../services/axiosCall";

import { resultStruct, resultCardStruct } from "./struct";

const CandidateResult = ({ result, topper }) => {
  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestDetails, trainerTestLoading } = trainerTest;

  return topper ? (
    <Badge.Ribbon {...resultStruct.topperBadge}>
      <Card {...resultCardStruct}>
        <Statistic
          title={<div>{result.user ? result.user.name || "..." : "..."}</div>}
          value={result.score}
          precision={2}
          suffix={`/${trainerTestDetails.totalMarks}`}
        />
      </Card>
    </Badge.Ribbon>
  ) : (
    <Card {...resultCardStruct}>
      <Statistic
        title={<div>{result.user ? result.user.name || "..." : "..."}</div>}
        value={result.score}
        precision={2}
        suffix={`/${trainerTestDetails.totalMarks}`}
      />
    </Card>
  );
};

const CandidateResults = ({ testId, setCurrentTestDetails }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const fetchResult = () => {
    setLoading(true);
    SecurePost({
      url: `${apis.GET_RESULTS}`,
      data: { testId },
    })
      .then((response) => {
        if (response.data.success) {
          const { test, result } = response.data.data || {};

          setResults(result);
          setCurrentTestDetails(test);
        } else messageApi.error(response.data.message);

        setLoading(false);
      })
      .catch(() => {
        messageApi.error("Server Error");
        setLoading(false);
      });
  };

  useState(() => {
    fetchResult();
  }, []);

  return (
    <>
      {contextHolder}
      {results && results.length ? (
        <Flex {...resultStruct.resultSection}>
          {results.map((result, index) =>
            index ? (
              <CandidateResult result={result} topper={false} />
            ) : (
              <CandidateResult result={result} topper={true} />
            )
          )}
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default CandidateResults;
