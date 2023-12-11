import React, { useState } from "react";

import { message, Statistic, Card, Badge, Flex } from "antd";

import apis from "../../../../../services/Apis";
import { SecurePost } from "../../../../../services/axiosCall";

const CandidateResult = ({ result }) => (
  <Card>
    <Statistic
      title={<div>{result.user ? result.user.name || "..." : "..."}</div>}
      value={result.score}
      precision={2}
    />
  </Card>
);

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
        <Flex gap="middle">
          {results.map((result, index) =>
            index ? (
              <CandidateResult result={result} />
            ) : (
              <Badge.Ribbon text="Topper" color="red">
                <CandidateResult result={result} />
              </Badge.Ribbon>
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
