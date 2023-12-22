import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Input, Card, Divider } from "antd";

import TestDetails from "./components/Testdetails";
import TestLink from "./components/TestLink";
import Candidates from "./components/Candidates";
import TestAction from "./components/TestActions";

import { searchStruct } from "./struct";

const { Search } = Input;

const ConductTestS = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [localTestId, setLocalTestId] = useState(searchParams.get("testId"));

  const changeLocalTestId = (searchId) => {
    setSearchParams((params) => {
      params.set("testId", searchId);
      return params;
    });
    setLocalTestId(searchId);
  };

  return (
    <Card>
      {!localTestId ? (
        <Search {...searchStruct} onSearch={changeLocalTestId} />
      ) : (
        <>
          <TestDetails testId={localTestId} />
          <Divider />

          <TestLink testId={localTestId} />
          <Divider />

          <TestAction testId={localTestId} />
          <Divider />

          <Candidates id={localTestId} />
        </>
      )}
    </Card>
  );
};

export default ConductTestS;
