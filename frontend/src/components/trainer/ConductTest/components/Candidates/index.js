import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Button, Typography } from "antd";

import { getCandidates } from "../../../../../actions/candidate.action";

import {
  getCandidateStaticColumns,
  tableStruct,
  testLinkStruct,
} from "./struct";

const { Text } = Typography;

const Candidates = ({ id }) => {
  const [examLink, setExamLink] = useState("");

  const dispatch = useDispatch();

  const candidates = useSelector((state) => state.candidate);
  const { candidates: candidateList, candidatesLoading } = candidates;

  const fetchCandidates = () => {
    dispatch(getCandidates(id));
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
    <Text {...testLinkStruct}>{`${examLink}${key}`}</Text>
  );

  const columns = [...getCandidateStaticColumns(getActions)];

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
