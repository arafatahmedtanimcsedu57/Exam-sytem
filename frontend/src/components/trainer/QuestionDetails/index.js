import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import apis from "../../../services/Apis";
import { SecureGet } from "../../../services/axiosCall";

import { questionDetailSection, getTabStruct } from "./struct.js";

export const QuestionDetails = ({ id }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    SecureGet({
      url: `${apis.FETCH_SINGLE_QUESTION}/${id}`,
    })
      .then((response) => setDetails(response.data.data[0]))
      .catch((error) => console.log(error));
  }, []);

  return details ? (
    <Tabs {...questionDetailSection} items={[...getTabStruct(details)]} />
  ) : (
    <></>
  );
};

export default QuestionDetails;
