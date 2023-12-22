import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Typography } from "antd";

import { setLink } from "../../../../../actions/trainerTest.action";

import { testLinkSectionStruct } from "./struct";

const { Text } = Typography;

const TestLink = ({ testId }) => {
  const dispatch = useDispatch();

  const trainerTest = useSelector((state) => state.trainerTest);
  const { trainerTestCurrentRegistrationLink } = trainerTest;

  useEffect(() => {
    if (testId) {
      var host = window.location.href.split("/").splice(0, 3);
      var mainlink = "";
      host.forEach((d) => (mainlink = mainlink + d + "/"));

      dispatch(setLink(mainlink, testId));
    }
  }, []);

  return (
    <Flex {...testLinkSectionStruct.testLink}>
      <Text>Registration link</Text>
      <Text {...testLinkSectionStruct.link}>
        {trainerTestCurrentRegistrationLink}
      </Text>
    </Flex>
  );
};

export default TestLink;
