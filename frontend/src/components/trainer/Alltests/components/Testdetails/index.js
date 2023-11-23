import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Descriptions, Skeleton, Tag, Input, message } from "antd";

import { updateQuestiosnActiveTest } from "../../../../../actions/trainerAction";

import { SecurePost } from "../../../../../services/axiosCall";
import apis from "../../../../../services/Apis";

// import Questions from "../conducttest/questions";
// import Stats from "./components/stats";
// import Trainee from "./components/trainee";
// import FeedBacks from "./components/feedbacks";

import { getTabStruct } from "./struct";

const { TabPane } = Tabs;

const TestDetails = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const trainer = useSelector((state) => state.trainer);

  const [id, setId] = useState(trainer.DataActiveTestDetails.testDetailsId);
  const [testdetails, setTestdetails] = useState(null);
  const [stats, setStats] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maxMarks, setMaxMarks] = useState(0);
  const [mainlink, setMainlink] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [questions, setQuestions] = useState([]);

  useState(() => {
    var link = window.location.href.split("/").splice(0, 3);
    var _mainlink = "";
    link.forEach((d, i) => {
      _mainlink = _mainlink + d + "/";
    });
    setMainlink(_mainlink);

    var p1 = SecurePost({
      url: `${apis.GET_SINGLE_TEST}`,
      data: {
        id: id,
      },
    });

    var p2 = SecurePost({
      url: apis.GET_STATS,
      data: {
        testid: id,
      },
    });

    var p3 = SecurePost({
      url: apis.GET_EXCEL,
      data: {
        id: id,
      },
    });

    var p4 = SecurePost({
      url: apis.MAX_MARKS_FETCH,
      data: {
        testid: id,
      },
    });

    var p5 = SecurePost({
      url: apis.GET_FEEDBACKS,
      data: {
        testid: id,
      },
    });

    var p6 = SecurePost({
      url: apis.GET_TEST_QUESTIONS,
      data: {
        id: id
      }
    });

    Promise.all([p1, p2, p3, p4, p5, p6])
      .then((response) => {
        if (
          response[0].data.success &&
          response[1].data.success &&
          response[2].data.success &&
          response[3].data.success &&
          response[4].data.success &&
          response[5].data.success
        ) {
          setTestdetails(response[0].data.data);
          setStats(response[1].data.data);
          setFile(response[2].data.file);
          setMaxMarks(response[3].data.data);
          setLoading(false);
          setFeedbacks(response[4].data.data);
          setQuestions(response[5].data.data.length > 0 ? response[5].data.data.map(question => question._id) : []);
        } else {
          messageApi.error(
            response[0].data.message +
            response[1].data.message +
            response[2].data.message
          );
        }
      })
      .catch((error) => {
        messageApi.error("Server Error.");
      });
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton active />
      </>
    );
  } else {
    return (
      <>
        {contextHolder}
        <Tabs
          defaultActiveKey="1"
          items={[...getTabStruct(trainer, testdetails, questions, mainlink, id)]}
        >
          {/* {testdetails.testconducted ? (
            <TabPane
              tab={
                <span>
                  <Icon type="question-circle" />
                  Questions
                </span>
              }
              key="2"
            >
              <Questions
                id={this.props.trainer.DataActiveTestDetails.testDetailsId}
                questionsOfTest={
                  this.props.trainer.DataActiveTestDetails.testquestions
                }
                updateQuestiosnTest={this.props.updateQuestiosnActiveTest}
              />
            </TabPane>
          ) : null} */}
          {/* {testdetails.testconducted ? (
              <TabPane
                tab={
                  <span>
                    <Icon type="user" />
                    Trainees
                  </span>
                }
                key="3"
              >
                <Trainee
                  maxmMarks={this.state.maxMarks}
                  id={this.state.id}
                  stats={this.state.stats}
                />
              </TabPane>
            ) : null} */}
          {/* {testdetails.testconducted ? (
              <TabPane
                tab={
                  <span>
                    <Icon type="pie-chart" />
                    Statistics
                  </span>
                }
                key="4"
              >
                <Stats
                  id={this.state.id}
                  stats={this.state.stats}
                  file={this.state.file}
                  maxmMarks={this.state.maxMarks}
                />
              </TabPane>
            ) : null} */}
          {/* {testdetails.testconducted ? (
              <TabPane
                tab={
                  <span>
                    <Icon type="message" />
                    Feedbacks
                  </span>
                }
                key="5"
              >
                <FeedBacks feedbacks={this.state.feedbacks} />
              </TabPane>
            ) : null} */}
        </Tabs>
      </>
    );
  }
};

export default TestDetails;
